import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MakeService } from '../../services/make.service';
import { FeatureService } from '../../services/feature.service';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/Observable/forkJoin';
import { Utils } from '../shared/common/utils';
import { Notify } from '../shared/common/notify';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    @ViewChild('vehicleForm') vehicleFormRef: NgForm
    @ViewChild('contactForm') contactFormRef: NgForm
    pendingRequest: Boolean = false

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

        private _makeService: MakeService,
        private _featureService: FeatureService,
        private _vehicleService: VehicleService) {

        _route.params.subscribe(p => {
            this.vehicle.id = p['id']
        })
    }

    async ngOnInit() {
        try {
            var self = this
            var sources = [
                self._makeService.getMakesList(),
                self._featureService.getFeaturesList()
            ]

            if (!Utils.isNullOrEmpty(self.vehicle.id)) {
                sources.push(self._vehicleService.getVehicle(self.vehicle.id))
            }

            var results = await Observable.forkJoin(sources).toPromise<any>()
            var [data1, data2, data3] = results;

            if (data1 && data1.error === false) {
                var resources = data1.resources
                self.makesList = resources.itemsList
            }

            if (data2 && data2.error === false) {
                var resources = data2.resources
                self.featuresList = resources.itemsList
            }

            if (data3) {
                if (data3.error === false) {
                    self.setVehicle(data3)
                    self.populateModels()
                }
                else {
                    throw data3.errorMessage
                }
            }
        }
        catch (e) {
            self._router.navigate(['/not-found'])
        }
    }

    setVehicle(data) {
        var self = this
        var resources = data.resources

        self.vehicle.id = resources.id
        self.vehicle.contactName = resources.contactName
        self.vehicle.contactEmail = resources.contactEmail
        self.vehicle.contactPhone = resources.contactPhone
        self.vehicle.makeId = resources.make.id
        self.vehicle.modelId = resources.model.id
        self.vehicle.isRegistered = resources.isRegistered
        self.vehicle.featuresIds = resources.features.map(x => x.id)
    }

    onMakeChange() {
        var self = this
        self.populateModels()
        self.vehicle.modelId = 0
    }

    populateModels() {
        var self = this
        var selectedMake = self.makesList.find(m => m.id === self.vehicle.makeId)
        self.modelsList = selectedMake ? selectedMake.models : []
    }

    onFeatureToggle(featureId, $event) {
        var self = this
        if ($event.target.checked) {
            self.vehicle.featuresIds.push(featureId)
        }
        else {
            var index = self.vehicle.featuresIds.indexOf(featureId)
            self.vehicle.featuresIds.splice(index, 1)
        }
    }

    isFeatureIncluded(featureId) {
        var self = this
        return self.vehicle.featuresIds.includes(featureId)
    }

    isNewVehicle() {
        var self = this
        return Utils.isNullOrEmpty(self.vehicle.id)
    }

    async submit($event) {
        try {
            var self = this

            $event.preventDefault()
            self.triggerValidations()
            if (self.vehicleFormRef.invalid || self.contactFormRef.invalid) {
                return
            }

            self.pendingRequest = true
            var requestBody = {
                id: Utils.tryGet(() => self.vehicle.id),
                contactName: Utils.tryGet(() => self.vehicle.contactName),
                contactEmail: Utils.tryGet(() => self.vehicle.contactEmail),
                contactPhone: Utils.tryGet(() => self.vehicle.contactPhone),
                modelId: Utils.tryGet(() => self.vehicle.modelId),
                featuresIds: Utils.tryGet(() => self.vehicle.featuresIds),
                isRegistered: Utils.tryGet(() => self.vehicle.isRegistered)
            }

            var response = null
            if (self.vehicle.id) {
                response = await self._vehicleService
                    .updateVehicle(self.vehicle.id, requestBody).toPromise<any>()
            }
            else {
                response = await self._vehicleService
                    .createVehicle(requestBody).toPromise<any>()
            }

            if (response.error === false) {
                Notify.showSuccessNotification('The operation was completed successfully.')
            }
        }
        finally {
            self.pendingRequest = false
        }
    }

    triggerValidations() {
        var self = this
        Object.keys(self.vehicleFormRef.controls)
            .forEach(field => {
                var control = self.vehicleFormRef.controls[field]
                control.markAsTouched({ onlySelf: true })
            })
        Object.keys(self.contactFormRef.controls)
            .forEach(field => {
                var control = self.contactFormRef.controls[field]
                control.markAsTouched({ onlySelf: true })
            })
    }
}
