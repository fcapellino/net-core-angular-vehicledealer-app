import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthManager } from '../../auth/app.auth.manager';
import { ImageService } from '../../services/image.service';
import { Notify } from '../shared/common/notify';
import { Utils } from '../shared/common/utils';
declare var $: any;

@Component({
    selector: 'app-vehicle-images',
    templateUrl: './vehicle-images.component.html',
    styleUrls: ['./vehicle-images.component.css']
})
export class VehicleImagesComponent implements OnInit {
    pendingRequest: Boolean = false
    uploadDivVisible: Boolean = true
    uploadProgress: any = null

    vehicle: any = {
        id: null,
        images: []
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authManager: AuthManager,
        private _imageService: ImageService) {

        _route.params.subscribe(p => {
            this.vehicle.id = p['id']
        })
    }

    ngOnInit() {
        var self = this
        self.setImageViewer()
        self.setVehicleImages()
    }

    isUserInRole(role) {
        var self = this
        return this._authManager.isInRole(role)
    }

    async setVehicleImages() {
        try {
            var self = this
            var parameters = $.extend(true, {}, {
                vehicleId: Utils.tryGet(() => self.vehicle.id),
            })

            var response = await self._imageService.getImagesList(parameters).toPromise<any>()
            if (response?.error === false) {
                var resources = response.resources
                self.vehicle.images = resources.itemsList
            }
            else {
                throw response.errorMessage
            }
        }
        catch (e) {
            self._router.navigate(['/not-found'])
        }
    }

    setImageViewer() {
        var self = this
        var modal = document.getElementById("myModalImg")
        var span = (<HTMLElement>document.getElementsByClassName("close-modal")[0])

        // when the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none"
            self.uploadDivVisible = true
        }
    }

    openViewer($event) {
        var self = this
        var modal = document.getElementById("myModalImg")
        var img = $event.target
        var modalImg = (<HTMLImageElement>document.getElementById("modalImg"))

        self.uploadDivVisible = false
        modalImg.src = img.src
        modal.style.display = "block"
    }

    openFileDialog() {
        var self = this
        document.getElementById('newImage').click()
    }

    async uploadImage($event) {
        try {
            var self = this
            self.pendingRequest = true

            var files = $event.target.files
            if (files.length !== 1) {
                return
            }

            var selectedFile = files[0]
            var formData = new FormData()
            formData.append('vehicleId', Utils.tryGet(() => self.vehicle.id))
            formData.append('file', Utils.tryGet(() => selectedFile))

            var onProgress = function (percentage) {
                self.uploadProgress = `${percentage}%`
                if (percentage === 100) {
                    window.setTimeout(() => self.uploadProgress = null, 500)
                }
            }

            var httpRequest = self._imageService.uploadImage(formData, onProgress)
            var response = await httpRequest.toPromise<any>()
            if (response?.error === false) {
                self.setVehicleImages()
            }
        }
        catch (e) { }
        finally {
            (<HTMLInputElement>document.getElementById('newImage')).value = null
            self.pendingRequest = false
        }
    }

    async deleteImage(item) {
        try {
            var self = this
            var response = await self._imageService.deleteImage(item.id).toPromise<any>()
            if (response?.error === false) {
                Notify.showSuccessNotification('The operation was completed successfully.')
                var index = self.vehicle.images.findIndex(x => x.id === item.id)
                self.vehicle.images.splice(index, 1)
            }
        }
        catch (e) { }
    }
}
