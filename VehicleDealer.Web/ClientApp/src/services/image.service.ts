import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getImagesList(params: any) {
        return this.httpClient
            .get('/api/images/getimageslist', {
                params
            })
    }

    uploadImage(body: any, onProgress: Function = null) {
        return this.httpClient.post('/api/images/uploadimage', body, {
            reportProgress: true,
            observe: 'events'
        }).pipe(map((event) => {
            if (event.type === HttpEventType.UploadProgress && onProgress) {
                var progress = Math.round(100 * event.loaded / event.total);
                onProgress(progress)
            }
            if (event.type === HttpEventType.Response) {
                return event.body;
            }
        }))
    }

    deleteImage(id: any) {
        return this.httpClient
            .post('/api/images/deleteimage', {}, {
                params: { id }
            })
    }
}
