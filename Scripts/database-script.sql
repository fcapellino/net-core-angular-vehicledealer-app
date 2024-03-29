USE [master]
GO
CREATE DATABASE [VehicleDealerDB]
GO
ALTER DATABASE [VehicleDealerDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
BEGIN
EXEC [VehicleDealerDB].[dbo].[sp_fulltext_database] @action = 'enable'
END
GO
ALTER DATABASE [VehicleDealerDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [VehicleDealerDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [VehicleDealerDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [VehicleDealerDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [VehicleDealerDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [VehicleDealerDB] SET  MULTI_USER 
GO
ALTER DATABASE [VehicleDealerDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [VehicleDealerDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [VehicleDealerDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [VehicleDealerDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [VehicleDealerDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [VehicleDealerDB] SET QUERY_STORE = OFF
GO
USE [VehicleDealerDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [VehicleDealerDB]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 15/7/2020 10:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 15/7/2020 10:54:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 15/7/2020 10:54:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 15/7/2020 10:54:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 15/7/2020 10:54:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [uniqueidentifier] NOT NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 15/7/2020 10:54:13 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [uniqueidentifier] NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[FirstName] [nvarchar](30) NOT NULL,
	[LastName] [nvarchar](30) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 15/7/2020 10:54:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [uniqueidentifier] NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Features]    Script Date: 15/7/2020 10:54:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Features](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Features] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImageFiles]    Script Date: 15/7/2020 10:54:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImageFiles](
	[Id] [uniqueidentifier] NOT NULL,
	[FileName] [nvarchar](255) NOT NULL,
	[VehicleId] [uniqueidentifier] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_ImageFiles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Makes]    Script Date: 15/7/2020 10:54:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Makes](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Makes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Models]    Script Date: 15/7/2020 10:54:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Models](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[MakeId] [uniqueidentifier] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Models] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VehicleFeatures]    Script Date: 15/7/2020 10:54:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VehicleFeatures](
	[Id] [uniqueidentifier] NOT NULL,
	[VehicleId] [uniqueidentifier] NOT NULL,
	[FeatureId] [uniqueidentifier] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_VehicleFeatures] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vehicles]    Script Date: 15/7/2020 10:54:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vehicles](
	[Id] [uniqueidentifier] NOT NULL,
	[ContactName] [nvarchar](255) NOT NULL,
	[ContactEmail] [nvarchar](255) NULL,
	[ContactPhone] [nvarchar](255) NOT NULL,
	[ModelId] [uniqueidentifier] NOT NULL,
	[IsRegistered] [bit] NOT NULL,
	[LastUpdate] [datetime2](7) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Vehicles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'7ef2e635-f700-47b0-9f5e-08d70d50371b', N'administrator', N'ADMINISTRATOR', N'26e5bca5-2f19-4ef2-bda8-da074c396191')
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'143c5076-cf34-4c67-9f5f-08d70d50371b', N'regular', N'REGULAR', N'c89bd1c4-a88e-4158-859c-d7ae139438eb')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'c90e9c89-fca7-4ddc-b939-359d010ba158', N'7ef2e635-f700-47b0-9f5e-08d70d50371b')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FirstName], [LastName], [IsDeleted]) VALUES (N'c90e9c89-fca7-4ddc-b939-359d010ba158', N'c90e9c89-fca7-4ddc-b939-359d010ba158', N'C90E9C89-FCA7-4DDC-B939-359D010BA158', N'admin@domain.com', N'ADMIN@DOMAIN.COM', 0, N'AQAAAAEAACcQAAAAEFGXfbPDmxeCTRkqgBbKzyJQakNcp9okP11GyehfyNqQcEKpfJ+4smqhafdLKiw3Hw==', N'JNL7DAYXNOF776DQ4GG4LX5TPQMGL5UY', N'd3f805d5-5004-4b30-b4d2-c8b60c04f2b2', NULL, 0, 1, NULL, 1, 0, N'john', N'doe', 0)
INSERT [dbo].[Features] ([Id], [Name], [IsDeleted]) VALUES (N'8499ed91-5258-4ce5-a507-0a7763f92fb8', N'Cruise Control', 0)
INSERT [dbo].[Features] ([Id], [Name], [IsDeleted]) VALUES (N'41dd1605-8c91-47f2-84b6-3da3cc7ec1c9', N'Automatic Transmission', 0)
INSERT [dbo].[Features] ([Id], [Name], [IsDeleted]) VALUES (N'42f32e61-fc2e-454a-aeac-856cf7c34948', N'Heated Seats', 0)
INSERT [dbo].[Features] ([Id], [Name], [IsDeleted]) VALUES (N'6ce246de-2057-46f0-afe5-9a1d9c7df29e', N'Blind Spot Detection', 0)
INSERT [dbo].[Features] ([Id], [Name], [IsDeleted]) VALUES (N'322b2fb6-125d-484a-a62e-a0c536da639b', N'Navigation System', 0)
INSERT [dbo].[Makes] ([Id], [Name], [IsDeleted]) VALUES (N'c1b27c55-edbe-4b43-97a8-3fb5f80ff62e', N'General Motors', 0)
INSERT [dbo].[Makes] ([Id], [Name], [IsDeleted]) VALUES (N'9ef4a8c2-7741-4f56-baab-65dd518c4ef8', N'Toyota Motors', 0)
INSERT [dbo].[Makes] ([Id], [Name], [IsDeleted]) VALUES (N'cce34986-a043-4cf5-964c-800ecee3f020', N'Volkswagen Group', 0)
INSERT [dbo].[Makes] ([Id], [Name], [IsDeleted]) VALUES (N'8df0287d-dd97-408d-89ea-8c07b8f6bad7', N'Ford Motors', 0)
INSERT [dbo].[Makes] ([Id], [Name], [IsDeleted]) VALUES (N'a644c01a-1a6d-486b-80cf-9a37d3980997', N'Nissan Group', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'd942e9a2-e5b2-4900-b191-06ddd11243c1', N'Hilux', N'9ef4a8c2-7741-4f56-baab-65dd518c4ef8', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'73c8142e-536f-47c7-a066-3a4235aae6aa', N'Chevrolet Volt', N'c1b27c55-edbe-4b43-97a8-3fb5f80ff62e', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'ff9b7dc1-1b73-4f4c-9455-50c7c7f88574', N'Amarok', N'cce34986-a043-4cf5-964c-800ecee3f020', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'79e95f2b-1a28-4070-a958-5c7b73f5b6d1', N'Ranger', N'8df0287d-dd97-408d-89ea-8c07b8f6bad7', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'5eabcc30-bf16-42ba-9e32-728192914f82', N'Phaeton', N'cce34986-a043-4cf5-964c-800ecee3f020', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'a2c963fd-adb0-44f9-86ad-a377d62f7836', N'Hummer H2', N'c1b27c55-edbe-4b43-97a8-3fb5f80ff62e', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'5fb0888d-776f-4701-ab4a-c122987319b7', N'Focus ST', N'8df0287d-dd97-408d-89ea-8c07b8f6bad7', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'c2e37bb5-3f1f-48b9-9e3f-c91e7c5262c4', N'Mustang', N'8df0287d-dd97-408d-89ea-8c07b8f6bad7', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'5f7694a1-6358-46ff-b946-e555260fd096', N'Century', N'9ef4a8c2-7741-4f56-baab-65dd518c4ef8', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'8ce41ec1-3375-4bbb-9bb5-ee8a84459898', N'Pathfinder', N'a644c01a-1a6d-486b-80cf-9a37d3980997', 0)
INSERT [dbo].[Models] ([Id], [Name], [MakeId], [IsDeleted]) VALUES (N'6aeb6dee-8f76-442a-b032-f7450388f329', N'Pontiac GTO', N'c1b27c55-edbe-4b43-97a8-3fb5f80ff62e', 0)
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 15/7/2020 10:54:16 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 15/7/2020 10:54:16 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_ImageFiles_VehicleId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_ImageFiles_VehicleId] ON [dbo].[ImageFiles]
(
	[VehicleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Models_MakeId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_Models_MakeId] ON [dbo].[Models]
(
	[MakeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_VehicleFeatures_FeatureId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_VehicleFeatures_FeatureId] ON [dbo].[VehicleFeatures]
(
	[FeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_VehicleFeatures_VehicleId_FeatureId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_VehicleFeatures_VehicleId_FeatureId] ON [dbo].[VehicleFeatures]
(
	[VehicleId] ASC,
	[FeatureId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Vehicles_ModelId]    Script Date: 15/7/2020 10:54:16 ******/
CREATE NONCLUSTERED INDEX [IX_Vehicles_ModelId] ON [dbo].[Vehicles]
(
	[ModelId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[ImageFiles]  WITH CHECK ADD  CONSTRAINT [FK_ImageFiles_Vehicles_VehicleId] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ImageFiles] CHECK CONSTRAINT [FK_ImageFiles_Vehicles_VehicleId]
GO
ALTER TABLE [dbo].[Models]  WITH CHECK ADD  CONSTRAINT [FK_Models_Makes_MakeId] FOREIGN KEY([MakeId])
REFERENCES [dbo].[Makes] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Models] CHECK CONSTRAINT [FK_Models_Makes_MakeId]
GO
ALTER TABLE [dbo].[VehicleFeatures]  WITH CHECK ADD  CONSTRAINT [FK_VehicleFeatures_Features_FeatureId] FOREIGN KEY([FeatureId])
REFERENCES [dbo].[Features] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[VehicleFeatures] CHECK CONSTRAINT [FK_VehicleFeatures_Features_FeatureId]
GO
ALTER TABLE [dbo].[VehicleFeatures]  WITH CHECK ADD  CONSTRAINT [FK_VehicleFeatures_Vehicles_VehicleId] FOREIGN KEY([VehicleId])
REFERENCES [dbo].[Vehicles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[VehicleFeatures] CHECK CONSTRAINT [FK_VehicleFeatures_Vehicles_VehicleId]
GO
ALTER TABLE [dbo].[Vehicles]  WITH CHECK ADD  CONSTRAINT [FK_Vehicles_Models_ModelId] FOREIGN KEY([ModelId])
REFERENCES [dbo].[Models] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Vehicles] CHECK CONSTRAINT [FK_Vehicles_Models_ModelId]
GO
USE [master]
GO
ALTER DATABASE [VehicleDealerDB] SET  READ_WRITE 
GO
