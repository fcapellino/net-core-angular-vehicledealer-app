import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconsComponent } from '../../icons/icons.component';
import { LbdModule } from '../../lbd/lbd.module';
import { TypographyComponent } from '../../typography/typography.component';
import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        LbdModule
    ],
    declarations: [
        TypographyComponent,
        IconsComponent
    ]
})

export class AdminLayoutModule { }
