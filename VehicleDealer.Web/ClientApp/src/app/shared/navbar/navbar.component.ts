import { Location } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from '../../../auth/app.auth.manager';
import { ROUTES } from '../../sidebar/sidebar.component';

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        location: Location,
        private element: ElementRef,
        private _router: Router,
        private _authManager: AuthManager) {

        this.location = location
        this.sidebarVisible = false
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle)
        const navbar: HTMLElement = this.element.nativeElement
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0]
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton
        const body = document.getElementsByTagName('body')[0]
        setTimeout(function () {
            toggleButton.classList.add('toggled')
        }, 500)
        body.classList.add('nav-open')

        this.sidebarVisible = true
    }

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0]
        this.toggleButton.classList.remove('toggled')
        this.sidebarVisible = false
        body.classList.remove('nav-open')
    }

    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen()
        } else {
            this.sidebarClose()
        }
    }

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path())
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1)
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title
            }
        }
        return 'Dashboard'
    }

    logout() {
        var self = this
        self._authManager.logout()
        self._router.navigate(['/login'])
    }

    changePassword() {
        var self = this
        self._router.navigate(['/change-password'])
    }
}
