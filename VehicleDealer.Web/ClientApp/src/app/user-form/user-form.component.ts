import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/Observable/forkJoin';
import { UserService } from '../../services/user.service';
import { Notify } from '../shared/common/notify';
import { Utils } from '../shared/common/utils';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @ViewChild('userForm') userFormRef: NgForm
    pendingRequest: Boolean = false

    rolesList: Array<any> = []

    user: any = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        roleId: 0
    }

    constructor(
        private _router: Router,
        private _userService: UserService) {
    }

    async ngOnInit() {
        try {
            var self = this
            var sources = [
                self._userService.getUsersRoleList()
            ]

            var responses = await Observable.forkJoin(sources).toPromise<any>()
            var [data1] = responses;

            if (data1 && data1.error === false) {
                var resources = data1.resources
                self.rolesList = resources.itemsList
            }
        }
        catch (e) {
            self._router.navigate(['/not-found'])
        }
    }

    async submit($event) {
        try {
            var self = this
            self.pendingRequest = true

            $event.preventDefault()
            self.triggerValidations()
            if (self.userFormRef.invalid) {
                return
            }

            var role = self.rolesList.find(r => r.id === self.user.roleId)
            var requestBody = {
                firstName: Utils.tryGet(() => self.user.firstName),
                lastName: Utils.tryGet(() => self.user.lastName),
                email: Utils.tryGet(() => self.user.email),
                role: Utils.tryGet(() => role.name)
            }

            var response = await self._userService
                .createUser(requestBody).toPromise<any>()

            if (response?.error === false) {
                Notify.showSuccessNotification('The operation was completed successfully.')
                self._router.navigate(['/users'])
            }
        }
        catch (e) { }
        finally {
            self.pendingRequest = false
        }
    }

    cancel() {
        var self = this
        self._router.navigate(['/users'])
    }

    triggerValidations() {
        var self = this
        Object.keys(self.userFormRef.controls)
            .forEach(field => {
                var control = self.userFormRef.controls[field]
                control.markAsTouched({ onlySelf: true })
            })
    }
}
