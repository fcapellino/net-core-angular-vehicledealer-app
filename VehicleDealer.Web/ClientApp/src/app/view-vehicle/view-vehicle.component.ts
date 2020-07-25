import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';

@Component({
    selector: 'app-view-vehicle',
    templateUrl: './view-vehicle.component.html',
    styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

    makesList: Array<any> = []
    modelsList: Array<any> = []
    featuresList: Array<any> = []

    vehicle: any = {
        id: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null,
        makeId: 0,
        modelId: 0,
        featuresIds: [],
        isRegistered: null
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehicleService: VehicleService) {

        _route.params.subscribe(p => {
            this.vehicle.id = p['id']
        })
    }

    async ngOnInit() {
        try {
            var self = this
            var response = await self._vehicleService.getVehicle(self.vehicle.id).toPromise<any>()
            if (response?.error === false) {
                self.setVehicle(response)
            }
            else {
                throw response.errorMessage
            }
        }
        catch (e) {
            self._router.navigate(['/not-found'])
        }
    }

    setVehicle(data) {
        var self = this
        var resources = data.resources

        self.makesList.push(resources.make)
        self.modelsList.push(resources.model)
        resources.features.forEach((f) => {
            self.featuresList.push(f)
        })

        self.vehicle.id = resources.id
        self.vehicle.contactName = resources.contactName
        self.vehicle.contactEmail = resources.contactEmail
        self.vehicle.contactPhone = resources.contactPhone
        self.vehicle.makeId = resources.make.id
        self.vehicle.modelId = resources.model.id
        self.vehicle.isRegistered = resources.isRegistered
        self.vehicle.featuresIds = resources.features.map(x => x.id)
    }

    isFeatureIncluded(featureId) {
        var self = this
        return self.vehicle.featuresIds.includes(featureId)
    }

    return() {
        var self = this
        self._router.navigate(['/vehicles'])
    }
}
