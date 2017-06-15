import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CosmonautsComponent }      from './cosmonauts.component';

const routes: Routes = [
    { path: '', redirectTo: '/cosmonauts', pathMatch: 'full' },
    { path: 'cosmonauts',  component: CosmonautsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
