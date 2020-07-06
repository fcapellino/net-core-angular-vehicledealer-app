import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class MakeService {
    httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getMakesList() {
        return this.httpClient
            .get('/api/makes/getmakeslist')
    }
}
