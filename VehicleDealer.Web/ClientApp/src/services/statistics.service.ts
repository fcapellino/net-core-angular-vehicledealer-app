import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class StatisticsService {
    private httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getStatistics() {
        return this.httpClient
            .get('/api/statistics/getstatistics')
    }
}
