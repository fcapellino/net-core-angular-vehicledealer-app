import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { AuthGuard } from '../auth/app.auth.guard';
import { AuthManager } from '../auth/app.auth.manager';

import { FeatureService } from '../services/feature.service';
import { ImageService } from '../services/image.service';
import { MakeService } from '../services/make.service';
import { StatisticsService } from '../services/statistics.service';
import { UserService } from '../services/user.service';
import { VehicleService } from '../services/vehicle.service';

import { AppComponent } from './app.component';
import { AppHttpInterceptor } from './app.http.interceptor';
import { AppRoutingModule } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LbdModule } from './lbd/lbd.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NotNullOrEmptyValidator } from './shared/common/validators';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { UserCpasswordComponent } from './user-cpassword/user-cpassword.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleImagesComponent } from './vehicle-images/vehicle-images.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewStatisticsComponent } from './view-statistics/view-statistics.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        CustomFormsModule,
        NgxTrimDirectiveModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        LbdModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        UserCpasswordComponent,
        UserLoginComponent,
        VehicleFormComponent,
        VehicleImagesComponent,
        VehicleListComponent,
        ViewStatisticsComponent,
        ViewVehicleComponent,
        NotFoundComponent,
        PaginationComponent,
        NotNullOrEmptyValidator,
        UserListComponent,
        UserFormComponent,
        ViewUserComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        FeatureService,
        ImageService,
        MakeService,
        StatisticsService,
        UserService,
        VehicleService,
        AuthGuard,
        AuthManager
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
