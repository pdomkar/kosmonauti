import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CosmonautsComponent }      from './cosmonauts/cosmonauts.component';
import { CosmonautAddComponent }      from './cosmonaut-add/cosmonaut-add.component';
import { CosmonautEditComponent }      from './cosmonaut-edit/cosmonaut-edit.component';

const routes: Routes = [
    { path: '', redirectTo: '/cosmonauts', pathMatch: 'full' },
    { path: 'cosmonauts',  component: CosmonautsComponent },
    { path: 'add',  component: CosmonautAddComponent },
    { path: 'edit/:id',  component: CosmonautEditComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
