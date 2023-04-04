import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getVehicle(id: any) {
        return this.httpClient
            .get('/api/vehicles/getvehicle', {
                params: { id }
            })
    }

    getVehiclesList(params: any) {
        return this.httpClient
            .get('/api/vehicles/getvehicleslist', {
                params
            })
    }

    createVehicle(body: any) {
        return this.httpClient
            .post('/api/vehicles/createvehicle', body)
    }

    updateVehicle(body: any) {
        return this.httpClient
            .post('/api/vehicles/updatevehicle', body)
    }

    deleteVehicle(id: any) {
        return this.httpClient
            .post('/api/vehicles/deletevehicle', {}, {
                params: { id }
            })
    }
}
