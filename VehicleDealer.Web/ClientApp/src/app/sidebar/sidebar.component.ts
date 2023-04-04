import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from '../../auth/app.auth.manager';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles?: Array<string>;
}
export const ROUTES: RouteInfo[] = [
    { path: '/vehicles', title: 'Vehicles', icon: 'pe-7s-note2', class: '' },
    { path: '/vehicles/new', title: 'New Vehicle', icon: 'pe-7s-car', class: '', roles: ['administrator'] },
    { path: '/statistics', title: 'Statistics', icon: 'pe-7s-graph', class: '' },
    { path: '/users', title: 'Users', icon: 'pe-7s-user', class: '' },
    { path: '/typography', title: 'Typography', icon: 'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons', icon: 'pe-7s-science', class: '' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[]

    constructor(
        private _router: Router,
        private _authManager: AuthManager) {
    }

    ngOnInit() {
        var self = this
        self.menuItems = ROUTES.filter(menuItem => {
            var roles = menuItem.roles
            var authorized = roles?.every(r => self._authManager.isInRole(r))
            return roles ? authorized : true
        })
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

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false
        }
        return true
    }
}
