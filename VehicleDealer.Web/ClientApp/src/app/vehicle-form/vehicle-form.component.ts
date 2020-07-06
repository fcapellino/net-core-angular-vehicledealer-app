import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';
import { FeatureService } from '../../services/feature.service';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    makeService: MakeService = null
    featureService: FeatureService = null

    makesList: Array<any> = []
    modelsList: Array<any> = []
    featuresList: Array<any> = []

    selectedMakeId: any = 0
    selectedModelId: any = 0

    constructor(
        makeService: MakeService,
        featureService: FeatureService) {

        this.makeService = makeService
        this.featureService = featureService
    }

    ngOnInit(): void {
        var self=this
        self.makeService.getMakesList()
            .subscribe((data:any) => {
                if (data.error === false) {
                    var resources = data.resources
                    self.makesList = resources.itemsList
                } 
            })

        self.featureService.getFeaturesList()
            .subscribe((data: any) => {
                if (data.error === false) {
                    var resources = data.resources
                    self.featuresList = resources.itemsList
                }
            })
    }

    onMakeChange() {
        var self = this
        var selectedMake = self.makesList.find(m => m.id === self.selectedMakeId)
        self.modelsList = selectedMake ? selectedMake.models : []
        self.selectedModelId = 0
    }
}
