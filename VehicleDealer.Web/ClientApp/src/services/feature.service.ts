import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FeatureService {
    private httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getFeaturesList() {
        return this.httpClient
            .get('/api/features/getfeatureslist')
    }
}
