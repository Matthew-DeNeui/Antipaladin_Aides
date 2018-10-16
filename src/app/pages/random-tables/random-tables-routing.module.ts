import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesListComponent } from './tables-list/tables-list.component';
import { ExportImportComponent } from './export-import/export-import.component';
import { RandomTablesComponent } from './random-tables.component';

const routes: Routes = [{
  path: '',
  component: RandomTablesComponent,
  children: [{
    path: 'list',
    component: TablesListComponent,
  },
  {
    path: 'export',
    component: ExportImportComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomTablesRoutingModule { }

export const routedComponents = [
  RandomTablesComponent,
  TablesListComponent,
  ExportImportComponent
];
