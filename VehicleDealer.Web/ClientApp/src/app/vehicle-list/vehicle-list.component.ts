import { Component, DoCheck, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { SweetAlert } from 'sweetalert/typings/core';
import { AuthManager } from '../../auth/app.auth.manager';
import { MakeService } from '../../services/make.service';
import { VehicleService } from '../../services/vehicle.service';
import { Notify } from '../shared/common/notify';
import { Utils } from '../shared/common/utils';
const swal: SweetAlert = require('sweetalert');
declare var $: any;

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit, DoCheck {
    watchers: any = {}
    makesList: Array<any> = []
    modelsList: Array<any> = []

    vehiclesTable: any = {
        filters: {
            searchQuery: null,
            makeId: 0,
            modelId: 0
        },
        options: {
            sortBy: null,
            sortDesc: null,
            page: 1,
            pageSize: 5
        },
        totalItemCount: 0,
        itemsList: [],
        headers: [
            { text: 'Index', value: '[id]', sortable: false },
            { text: 'Make', value: '[make.name]', sortable: true },
            { text: 'Model', value: '[model.name]', sortable: true },
            { text: 'Contact Name', value: '[contactname]', sortable: true },
            { text: 'Contact Phone', value: '[contactphone]', sortable: true },
            { text: 'Actions', value: '[actions]', sortable: false, class: 'text-right' }
        ]
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authManager: AuthManager,
        private _makeService: MakeService,
        private _vehicleService: VehicleService,
        private _differs: KeyValueDiffers) {
    }

    ngOnInit() {
        var self = this
        self.populateMakes()
        self.getVehiclesList()

        self.watchers['table_filters'] = self.
            _differs.find(self.vehiclesTable.filters).create()

        self.watchers['table_options'] = self.
            _differs.find(self.vehiclesTable.options).create()
    }

    ngDoCheck(): void {
        var self = this

        var table_filters = self.watchers['table_filters']?.diff(self.vehiclesTable.filters)
        if (table_filters) {
            self.getVehiclesListOnPage(1)
        }

        var table_options = self.watchers['table_options']?.diff(self.vehiclesTable.options)
        if (table_options) {
            self.getVehiclesList()
        }
    }

    isUserInRole(role) {
        var self = this
        return this._authManager.isInRole(role)
    }

    getVehiclesList = _.debounce(async () => {
        var self = this
        const { searchQuery, makeId, modelId } = self.vehiclesTable.filters
        const { sortBy, sortDesc, page, pageSize } = self.vehiclesTable.options

        var parameters = $.extend(true, {}, {
            searchQuery: Utils.tryGet(() => searchQuery),
            orderByColumn: Utils.tryGet(() => sortBy ? `${sortBy.replace(/[\[\]']+/g, '')} ${sortDesc ? 'desc' : 'asc'}` : null),
            page: Utils.tryGet(() => page),
            pageSize: Utils.tryGet(() => pageSize),
            makeId: Utils.tryGet(() => makeId),
            modelId: Utils.tryGet(() => modelId)
        })

        var response = await self._vehicleService.getVehiclesList(parameters).toPromise<any>()
        if (response?.error === false) {
            var resources = response.resources
            self.vehiclesTable.itemsList = resources.itemsList
            self.vehiclesTable.totalItemCount = resources.totalItemCount
        }
    }, 300)

    getVehiclesListOnPage(page) {
        var self = this
        self.vehiclesTable.options.page = page
        self.getVehiclesList()
    }

    getItemIndex(item) {
        var self = this
        var row = self.vehiclesTable.itemsList.findIndex(u => u.id === item.id) + 1
        return ((self.vehiclesTable.options.page - 1) * self.vehiclesTable.options.pageSize + row).toString().padStart(2, '0')
    }

    sortBy(header) {
        var self = this
        if (!header.sortable) {
            return
        }

        if (self.vehiclesTable.options.sortBy !== header.value) {
            self.vehiclesTable.options.sortBy = header.value
            self.vehiclesTable.options.sortDesc = null
        }

        var sortDesc = self.vehiclesTable.options.sortDesc
        switch (sortDesc) {
            case true:
                self.vehiclesTable.options.sortBy = null
                self.vehiclesTable.options.sortDesc = null
                break
            case false:
                self.vehiclesTable.options.sortDesc = true
                break
            default:
                self.vehiclesTable.options.sortDesc = false
                break
        }
    }

    sortStatus(header) {
        var self = this
        if (self.vehiclesTable.options.sortBy === header.value) {
            return self.vehiclesTable.options.sortDesc ? 'asc' : 'desc'
        }
    }

    async populateMakes() {
        try {
            var self = this
            var response = await self._makeService.getMakesList().toPromise<any>()
            if (response?.error === false) {
                var resources = response.resources
                self.makesList = resources.itemsList
            }
        }
        catch (e) { }
    }

    onMakeChange() {
        var self = this
        self.populateModels()
        self.vehiclesTable.filters.modelId = 0
    }

    populateModels() {
        var self = this
        var selectedMake = self.makesList.find(m => m.id === self.vehiclesTable.filters.makeId)
        self.modelsList = selectedMake ? selectedMake.models : []
        self.vehiclesTable.filters.modelId = 0
    }

    onPageChange(page) {
        var self = this
        self.getVehiclesListOnPage(page)
    }

    clearSelectedMake() {
        var self = this
        self.vehiclesTable.filters.makeId = 0
        self.populateModels()
    }

    clearSelectedModel() {
        var self = this
        self.vehiclesTable.filters.modelId = 0
    }

    clearSearchQuery() {
        var self = this
        self.vehiclesTable.filters.searchQuery = null
    }

    newVehicle() {
        var self = this
        self._router.navigate(['/vehicles/new'])
    }

    viewVehicle(item) {
        var self = this
        self._router.navigate(['/vehicles/' + item.id])
    }

    editVehicle(item) {
        var self = this
        self._router.navigate(['/vehicles/edit/' + item.id])
    }

    viewImages(item) {
        var self = this
        self._router.navigate(['/vehicles/' + item.id + '/images'])
    }

    async deleteVehicle(item) {
        try {
            var self = this
            var confirmed = await swal("Are you sure you want to delete this vehicle?", {
                dangerMode: true,
                buttons: [true, true]
            })

            if (confirmed === true) {
                var response = await self._vehicleService.deleteVehicle(item.id).toPromise<any>()
                if (response?.error === false) {
                    Notify.showSuccessNotification('The operation was completed successfully.')
                    self.getVehiclesListOnPage(1)
                }
            }
        }
        catch (e) { }
    }
}
