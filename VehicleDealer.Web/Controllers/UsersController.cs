﻿namespace VehicleDealer.Web.Controllers
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using System.Transactions;
    using MainProject.Web.Custom.Resources;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;
    using VehicleDealer.Domain.Entities;
    using VehicleDealer.Web.Custom;
    using VehicleDealer.Web.Custom.Enumerations;
    using VehicleDealer.Web.Dependencies.ApplicationContext;
    using VehicleDealer.Web.Dependencies.EmailService;
    using VehicleDealer.Web.Requests.User;
    using ISR = Microsoft.AspNetCore.Identity;

    [Authorize]
    [Route("Api/[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly EmailService _emailService;

        public UsersController(IServiceProvider serviceProvider)
        {
            _configuration = serviceProvider.GetService<IConfiguration>();
            _applicationDbContext = serviceProvider.GetService<ApplicationDbContext>();
            _userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();
            _signInManager = serviceProvider.GetService<SignInManager<ApplicationUser>>();
            _emailService = serviceProvider.GetService<EmailService>();
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _applicationDbContext.Set<ApplicationUser>()
                    .Include(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .FirstOrDefaultAsync(x => x.Id.Equals(id));

            if (user == null)
            {
                throw new CustomException("Invalid user specified.");
            }

            var item = new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email,
                Role = new
                {
                    Id = user.UserRoles.FirstOrDefault().RoleId,
                    user.UserRoles.FirstOrDefault().Role.Name
                }
            };

            return new SuccessResult(item);
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetUsersList(GetUsersListRequest request)
        {
            var query = _applicationDbContext.Set<ApplicationUser>()
                 .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                 .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.SearchQuery))
            {
                query = query.Where(item => (item.FirstName + item.LastName + item.Email)
                    .ToLower().Contains(request.SearchQuery.ToLower().Trim()));
            }

            if (!request.RoleId.Equals(Guid.Empty))
            {
                query = query.Where(item => item.UserRoles.Any(x => x.RoleId.Equals(request.RoleId)));
            }

            var pagedListResource = new PagedListResource
            {
                TotalItemCount = await query.CountAsync(),
                ItemsList = await query
                    .Select(item => new
                    {
                        item.Id,
                        item.FirstName,
                        item.LastName,
                        item.Email,
                        Role = new
                        {
                            Id = item.UserRoles.FirstOrDefault().RoleId,
                            item.UserRoles.FirstOrDefault().Role.Name
                        }
                    })
                    .ApplyOrdering(request.OrderByColumn)
                    .ApplyPaging(request.Page, request.PageSize)
                    .ToListAsync()
            };

            return new SuccessResult(pagedListResource);
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetUsersRoleList()
        {
            var listResult = new ListResource
            {
                ItemsList = await _applicationDbContext.Set<ApplicationRole>()
                                .OrderBy(r => r.Name)
                                .Select(r => new
                                {
                                    r.Id,
                                    Name = r.Name.ToUpper()
                                })
                                .ToListAsync()
            };

            return new SuccessResult(listResult);
        }

        [HttpPost]
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> CreateUser([FromBody] CreateNewUserRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var userAlreadyExists = await _applicationDbContext.Set<ApplicationUser>()
                    .AnyAsync(x => string.Equals(x.Email.ToLower(), request.Email.ToLower()));

                if (userAlreadyExists)
                    throw new CustomException("The entered email is already in use.");

                var newUser = new ApplicationUser()
                {
                    FirstName = request.FirstName.Trim(),
                    LastName = request.LastName.Trim(),
                    Email = request.Email.Trim().Normalize().ToLowerInvariant(),
                    TwoFactorEnabled = true
                };

                var password = Guid.NewGuid().ToString("n").Substring(0, 8).ToLower();
                var createResult = await _userManager.CreateAsync(newUser, password);
                var addToRoleResult = await _userManager.AddToRoleAsync(newUser, request.Role.ToLower());

                if (!(createResult.Succeeded && addToRoleResult.Succeeded))
                    throw new InvalidOperationException();

                string appBaseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}{HttpContext.Request.PathBase}";
                var emailBody = $"Your account has been successfully created. Password: <b>[ {password} ].</b> To access the site click on the following <a target='_blank' href='{appBaseUrl}'>link.</a>";

                await _emailService.SendAsync(newUser.Email, "Vehicle Dealer App", emailBody);
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        [HttpPost]
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                if (user == null)
                {
                    throw new CustomException("The user you are trying to delete does not exist.");
                }

                user.IsDeleted = true;
                await _userManager.UpdateAsync(user);
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        [HttpPost]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var currentUserId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var currentUser = await _userManager.FindByIdAsync(currentUserId);
                var result = await _userManager.ChangePasswordAsync(currentUser, request.OldPassword.Trim(), request.NewPassword.Trim());

                if (!result.Succeeded)
                {
                    throw new CustomException("You have entered an invalid password.");
                }
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GenerateJSONWebToken([FromBody] GenerateJSONWebTokenRequest request)
        {
            var applicationUser = await _userManager.FindByEmailAsync(request.Email.Trim().Normalize().ToLowerInvariant());
            var result = new ISR.SignInResult();

            if (applicationUser != null)
            {
                result = await _signInManager.CheckPasswordSignInAsync(applicationUser, request.Password.Trim(), lockoutOnFailure: false);
            }

            if (!result.Succeeded)
            {
                throw new CustomException("The username or password is incorrect.");
            }

            var userRoles = await _userManager.GetRolesAsync(applicationUser);
            var claimsIdentity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, applicationUser?.Id.ToString()) });
            claimsIdentity.AddClaims(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = _configuration.GetSection("JwtSettings:Secret").Value;
            var expirationTime = _configuration.GetSection("JwtSettings:ExpirationTime").Get<int>();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Expires = DateTime.UtcNow.AddMinutes(expirationTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)), SecurityAlgorithms.HmacSha256Signature),
                Subject = claimsIdentity
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);

            return new SuccessResult(new { Token = token });
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _applicationDbContext?.Dispose();
            _userManager?.Dispose();
        }
    }
}
