import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
    httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getFeaturesList() {
        return this.httpClient
            .get('/api/features/getfeatureslist')
    }
}
