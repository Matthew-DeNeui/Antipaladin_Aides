import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { EvilChartComponent } from './evil-chart/evil-chart.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule
  ],
  declarations: [
    LandingComponent,
    EvilChartComponent
  ]
})
export class LandingModule { }
