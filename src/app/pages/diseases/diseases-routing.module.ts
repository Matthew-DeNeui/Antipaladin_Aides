import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiseaseListComponent } from './disease-list/disease-list.component';
import { InfectionsComponent } from './infections/infections.component';
import { DiseasesComponent } from './diseases.component';
import { ExportImportComponent } from './export-import/export-import.component';

const routes: Routes = [{
  path: '',
  component: DiseasesComponent,
  children: [{
    path: 'list',
    component: DiseaseListComponent,
  }, {
    path: 'infections',
    component: InfectionsComponent,
  }, {
    path: 'export',
    component: ExportImportComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseasesRoutingModule { }

export const routedComponents = [
  DiseasesComponent,
  DiseaseListComponent,
  InfectionsComponent,
  ExportImportComponent
];
