import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
declare var $: any;

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    var response = evt.body
                    if (response.error === true) {
                        this.notify(response.errorMessage)
                    }
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.notify('Error. The operation cannot be completed.')
                }
                return of(err);
            }));
    }

    notify(errorMessage: string) {
        $.notify({ message: errorMessage }, { type: 'danger', timer: 1000, placement: { from: 'top', align: 'right' } });
    }
}
