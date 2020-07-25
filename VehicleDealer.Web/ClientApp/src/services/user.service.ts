import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private httpClient: HttpClient = null

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    getUser(id: any) {
        return this.httpClient
            .get('/api/users/getuser', {
                params: { id }
            })
    }

    getUsersList(params: any) {
        return this.httpClient
            .get('/api/users/getuserslist', {
                params
            })
    }

    getUsersRoleList() {
        return this.httpClient
            .get('/api/users/getusersrolelist')
    }

    createUser(body: any) {
        return this.httpClient
            .post('/api/users/createuser', body)
    }

    deleteUser(id: any) {
        return this.httpClient
            .post('/api/users/deleteuser', {}, {
                params: { id }
            })
    }

    changePassword(body: any) {
        return this.httpClient
            .post('/api/users/changepassword', body)
    }

    generateJSONWebToken(body: any) {
        return this.httpClient
            .post('/api/users/generatejsonwebtoken', body)
    }
}
