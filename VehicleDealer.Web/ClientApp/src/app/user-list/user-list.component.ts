import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { SweetAlert } from 'sweetalert/typings/core';
import { AuthManager } from '../../auth/app.auth.manager';
import { UserService } from '../../services/user.service';
import { Notify } from '../shared/common/notify';
import { Utils } from '../shared/common/utils';
const swal: SweetAlert = require('sweetalert');
declare var $: any;

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    watchers: any = {}
    rolesList: Array<any> = []

    usersTable: any = {
        filters: {
            searchQuery: null,
            roleId: 0
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
            { text: 'First Name', value: '[firstname]', sortable: true },
            { text: 'Last Name', value: '[lastname]', sortable: true },
            { text: 'Email', value: '[email]', sortable: true },
            { text: 'Role', value: '[role.name]', sortable: true },
            { text: 'Actions', value: '[actions]', sortable: false, class: 'text-right' }
        ]
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authManager: AuthManager,
        private _userService: UserService,
        private _differs: KeyValueDiffers) {
    }

    ngOnInit() {
        var self = this
        self.populateRoles()
        self.getUsersList()

        self.watchers['table_filters'] = self.
            _differs.find(self.usersTable.filters).create()

        self.watchers['table_options'] = self.
            _differs.find(self.usersTable.options).create()
    }

    ngDoCheck(): void {
        var self = this

        var table_filters = self.watchers['table_filters']?.diff(self.usersTable.filters)
        if (table_filters) {
            self.getUsersListOnPage(1)
        }

        var table_options = self.watchers['table_options']?.diff(self.usersTable.options)
        if (table_options) {
            self.getUsersList()
        }
    }

    isUserInRole(role) {
        var self = this
        return this._authManager.isInRole(role)
    }

    getUsersList = _.debounce(async () => {
        var self = this
        const { searchQuery, roleId } = self.usersTable.filters
        const { sortBy, sortDesc, page, pageSize } = self.usersTable.options

        var parameters = $.extend(true, {}, {
            searchQuery: Utils.tryGet(() => searchQuery),
            orderByColumn: Utils.tryGet(() => sortBy ? `${sortBy.replace(/[\[\]']+/g, '')} ${sortDesc ? 'desc' : 'asc'}` : null),
            page: Utils.tryGet(() => page),
            pageSize: Utils.tryGet(() => pageSize),
            roleId: Utils.tryGet(() => roleId)
        })

        var response = await self._userService.getUsersList(parameters).toPromise<any>()
        if (response?.error === false) {
            var resources = response.resources
            self.usersTable.itemsList = resources.itemsList
            self.usersTable.totalItemCount = resources.totalItemCount
        }
    }, 300)

    getUsersListOnPage(page) {
        var self = this
        self.usersTable.options.page = page
        self.getUsersList()
    }

    getItemIndex(item) {
        var self = this
        var row = self.usersTable.itemsList.findIndex(u => u.id === item.id) + 1
        return ((self.usersTable.options.page - 1) * self.usersTable.options.pageSize + row).toString().padStart(2, '0')
    }

    sortBy(header) {
        var self = this
        if (!header.sortable) {
            return
        }

        if (self.usersTable.options.sortBy !== header.value) {
            self.usersTable.options.sortBy = header.value
            self.usersTable.options.sortDesc = null
        }

        var sortDesc = self.usersTable.options.sortDesc
        switch (sortDesc) {
            case true:
                self.usersTable.options.sortBy = null
                self.usersTable.options.sortDesc = null
                break
            case false:
                self.usersTable.options.sortDesc = true
                break
            default:
                self.usersTable.options.sortDesc = false
                break
        }
    }

    sortStatus(header) {
        var self = this
        if (self.usersTable.options.sortBy === header.value) {
            return self.usersTable.options.sortDesc ? 'asc' : 'desc'
        }
    }

    async populateRoles() {
        try {
            var self = this
            var response = await self._userService.getUsersRoleList().toPromise<any>()
            if (response?.error === false) {
                var resources = response.resources
                self.rolesList = resources.itemsList
            }
        }
        catch (e) { }
    }

    onPageChange(page) {
        var self = this
        self.getUsersListOnPage(page)
    }

    clearSelectedRole() {
        var self = this
        self.usersTable.filters.roleId = 0
    }

    clearSearchQuery() {
        var self = this
        self.usersTable.filters.searchQuery = null
    }

    newUser() {
        var self = this
        self._router.navigate(['/users/new'])
    }

    viewUser(item) {
        var self = this
        self._router.navigate(['/users/' + item.id])
    }

    async deleteUser(item) {
        try {
            var self = this
            var confirmed = await swal("Are you sure you want to delete this user?", {
                dangerMode: true,
                buttons: [true, true]
            })

            if (confirmed === true) {
                var response = await self._userService.deleteUser(item.id).toPromise<any>()
                if (response?.error === false) {
                    Notify.showSuccessNotification('The operation was completed successfully.')
                    self.getUsersListOnPage(1)
                }
            }
        }
        catch (e) { }
    }
}
