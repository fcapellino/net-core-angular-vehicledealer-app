import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManager } from '../../auth/app.auth.manager';
import { Utils } from '../shared/common/utils';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    @ViewChild('loginForm') loginFormRef: NgForm
    pendingRequest: Boolean = false

    credentials: any = {
        email: null,
        password: null
    }

    constructor(
        private _router: Router,
        private _authManager: AuthManager) {

        if (this._authManager.authenticated()) {
            this._router.navigate(['/vehicles'])
        }
    }

    ngOnInit(): void { }

    async submit($event) {
        try {
            var self = this
            self.pendingRequest = true

            $event.preventDefault()
            self.triggerValidations()
            if (self.loginFormRef.invalid) {
                throw new Error()
            }

            var credentials = {
                email: Utils.tryGet(() => self.credentials.email),
                password: Utils.tryGet(() => self.credentials.password)
            }

            await self._authManager.login(credentials)
            var authenticated = self._authManager.authenticated()
            if (authenticated === false) {
                throw new Error()
            }

            self._router.navigate(['/vehicles'])
            return
        }
        catch (e) {
            self.pendingRequest = false
        }
    }

    triggerValidations() {
        var self = this
        Object.keys(self.loginFormRef.controls)
            .forEach(field => {
                var control = self.loginFormRef.controls[field]
                control.markAsTouched({ onlySelf: true })
            })
    }
}
