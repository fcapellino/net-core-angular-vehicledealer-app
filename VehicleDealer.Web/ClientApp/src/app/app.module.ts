import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NotNullOrEmptyValidator } from './shared/common/validators';

import { MakeService } from '../services/make.service';
import { FeatureService } from '../services/feature.service';
import { VehicleService } from '../services/vehicle.service';
import { AppHttpInterceptor } from './app.http.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';

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
        SidebarModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        VehicleFormComponent,
        NotNullOrEmptyValidator,
        NotFoundComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        MakeService,
        FeatureService,
        VehicleService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
