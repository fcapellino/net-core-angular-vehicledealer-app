import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LbdChartComponent } from './lbd-chart/lbd-chart.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [

    LbdChartComponent

  ],
  exports: [
    LbdChartComponent
  ]
})
export class LbdModule { }
