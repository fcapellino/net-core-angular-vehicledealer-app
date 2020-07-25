import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

    rolesList: Array<any> = []

    user: any = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        roleId: 0
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService) {

        _route.params.subscribe(p => {
            this.user.id = p['id']
        })
    }

    async ngOnInit() {
        try {
            var self = this
            var response = await self._userService.getUser(self.user.id).toPromise<any>()
            if (response?.error === false) {
                self.setUser(response)
            }
            else {
                throw response.errorMessage
            }
        }
        catch (e) {
            self._router.navigate(['/not-found'])
        }
    }

    setUser(data) {
        var self = this
        var resources = data.resources

        self.rolesList.push({
            id: resources.role.id,
            name: resources.role.name
        })

        self.user.id = resources.id
        self.user.firstName = resources.firstName
        self.user.lastName = resources.lastName
        self.user.email = resources.email
        self.user.roleId = resources.role.id
    }

    return() {
        var self = this
        self._router.navigate(['/users'])
    }
}
