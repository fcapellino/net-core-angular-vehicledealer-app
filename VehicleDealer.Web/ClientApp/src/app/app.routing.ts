import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/app.auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLoginComponent } from './user-login/user-login.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: UserLoginComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
