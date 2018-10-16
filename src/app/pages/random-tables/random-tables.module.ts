import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomTablesRoutingModule, routedComponents } from './random-tables-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableResultComponent } from './table-result/table-result.component';

@NgModule({
  imports: [
    CommonModule,
    RandomTablesRoutingModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...routedComponents,
    TableResultComponent
  ]
})
export class RandomTablesModule { }
