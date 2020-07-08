import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getVehicle(id: any) {
        return this.httpClient
            .get('/api/vehicles/getvehicle?id=' + id)
    }

    createVehicle(vehicle: any) {
        return this.httpClient
            .post('/api/vehicles/createvehicle', vehicle)
    }

    updateVehicle(id: any, vehicle: any) {
        return this.httpClient
            .post('/api/vehicles/updatevehicle?id=' + id, vehicle)
    }

    deleteVehicle(id: any) {
        return this.httpClient
            .post('/api/vehicles/deletevehicle?id=' + id, {})
    }
}
