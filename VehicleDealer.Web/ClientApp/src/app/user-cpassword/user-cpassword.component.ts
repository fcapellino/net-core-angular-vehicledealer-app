import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Notify } from '../shared/common/notify';
import { Utils } from '../shared/common/utils';

@Component({
    selector: 'app-user-cpassword',
    templateUrl: './user-cpassword.component.html',
    styleUrls: ['./user-cpassword.component.css']
})
export class UserCpasswordComponent implements OnInit {
    @ViewChild('passwordsForm') passwordsFormRef: NgForm
    pendingRequest: Boolean = false
    credentials: any = {}

    constructor(
        private _router: Router,
        private _userService: UserService) {
    }

    ngOnInit() { }

    async submit($event) {
        try {
            var self = this
            self.pendingRequest = true

            $event.preventDefault()
            self.triggerValidations()
            if (self.passwordsFormRef.invalid) {
                return
            }

            var requestBody = {
                oldPassword: Utils.tryGet(() => self.credentials.oldPassword),
                newPassword: Utils.tryGet(() => self.credentials.newPassword),
            }

            var response = await self._userService
                .changePassword(requestBody).toPromise<any>()

            if (response?.error === false) {
                self.passwordsFormRef.resetForm()
                Notify.showSuccessNotification('The operation was completed successfully.')
            }
        }
        catch (e) { }
        finally {
            self.pendingRequest = false
        }
    }

    cancel() {
        var self = this
        self._router.navigate(['/vehicles'])
    }

    triggerValidations() {
        var self = this
        Object.keys(self.passwordsFormRef.controls)
            .forEach(field => {
                var control = self.passwordsFormRef.controls[field]
                control.markAsTouched({ onlySelf: true })
            })
    }
}
