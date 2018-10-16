import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DiseasesRoutingModule, routedComponents } from './diseases-routing.module';
import { DiseaseEntryComponent } from './disease-entry/disease-entry.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    ThemeModule,
    DiseasesRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
    DiseaseEntryComponent,
    ...routedComponents,
  ]
})
export class DiseasesModule { }
