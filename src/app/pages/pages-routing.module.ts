import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'landing',
    component: LandingComponent,
  }, {
    path: 'diseases',
    loadChildren: './diseases/diseases.module#DiseasesModule',
  }, {
    path: 'random-tables',
    loadChildren: './random-tables/random-tables.module#RandomTablesModule',
  }, {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
