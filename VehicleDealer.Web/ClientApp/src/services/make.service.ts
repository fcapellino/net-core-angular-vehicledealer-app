import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MakeService {
    private httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getMakesList() {
        return this.httpClient
            .get('/api/makes/getmakeslist')
    }
}
