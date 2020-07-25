import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Notify } from './shared/common/notify';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        private _router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {

        var self = this
        var token = localStorage.getItem('token')
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            })
        }

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    var response = evt.body
                    if (response?.error === true) {
                        self.notify(response.errorMessage)
                    }
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    var status = err.status;
                    switch (status) {
                        case 401:
                            self._router.navigate(['/login'])
                            self.notify('Error. Invalid or expired token. Please re-login.')
                            break;
                        default:
                            self.notify('Error. The operation cannot be completed.')
                    }
                }
                return of(err)
            }))
    }

    notify = _.debounce((errorMessage: string) => {
        Notify.showErrorNotification(errorMessage)
    }, 100)
}
