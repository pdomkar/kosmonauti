import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CosmonautsComponent }      from './cosmonauts/cosmonauts.component';
import { CosmonautAddComponent }      from './cosmonaut-add/cosmonaut-add.component';
import { CosmonautEditComponent }      from './cosmonaut-edit/cosmonaut-edit.component';
import { PageNotFoundComponent }      from './page-not-found.component';

const routes: Routes = [
    { path: 'cosmonauts',  component: CosmonautsComponent },
    { path: 'add',  component: CosmonautAddComponent },
    { path: 'edit/:id',  component: CosmonautEditComponent },
    {path: '', redirectTo: '/cosmonauts', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
