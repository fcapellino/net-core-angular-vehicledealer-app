import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(public location: Location) { }

    ngOnInit() {
    }

    isMap(path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        var tmp = this.location;
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    }
}
