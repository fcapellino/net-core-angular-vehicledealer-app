import { Routes } from '@angular/router';
import { AuthGuard } from '../../../auth/app.auth.guard';

import { IconsComponent } from '../../icons/icons.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { TypographyComponent } from '../../typography/typography.component';
import { UserCpasswordComponent } from '../../user-cpassword/user-cpassword.component';
import { UserFormComponent } from '../../user-form/user-form.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { VehicleFormComponent } from '../../vehicle-form/vehicle-form.component';
import { VehicleImagesComponent } from '../../vehicle-images/vehicle-images.component';
import { VehicleListComponent } from '../../vehicle-list/vehicle-list.component';
import { ViewStatisticsComponent } from '../../view-statistics/view-statistics.component';
import { ViewUserComponent } from '../../view-user/view-user.component';
import { ViewVehicleComponent } from '../../view-vehicle/view-vehicle.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'vehicles',
        component: VehicleListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'vehicles/new',
        component: VehicleFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['administrator'] }
    },
    {
        path: 'vehicles/:id',
        component: ViewVehicleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'vehicles/edit/:id',
        component: VehicleFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['administrator'] }
    },
    {
        path: 'vehicles/:id/images',
        component: VehicleImagesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'statistics',
        component: ViewStatisticsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/new',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['administrator'] }
    },
    {
        path: 'users/:id',
        component: ViewUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'typography',
        component: TypographyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'icons',
        component: IconsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'change-password',
        component: UserCpasswordComponent,
        canActivate: [AuthGuard]
    }
]
