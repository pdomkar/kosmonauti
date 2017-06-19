import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CosmonautsComponent }      from './cosmonauts/cosmonauts.component';
import { CosmonautAddComponent }      from './cosmonaut-add/cosmonaut-add.component';
import { CosmonautEditComponent }      from './cosmonaut-edit/cosmonaut-edit.component';
import { CosmonautAddEditFormComponent }      from './cosmonaut-add-edit-form/cosmonaut-add-edit-form.component';
import { PaginatorComponent }      from './paginator/paginator.component';
import { CosmonautService }      from './services/cosmonaut.service';
import { PageNotFoundComponent }      from './page-not-found.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { MyDatePickerModule } from 'mydatepicker';
import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService), FormsModule, MyDatePickerModule, FlashMessagesModule],
  declarations: [AppComponent, CosmonautsComponent, CosmonautAddComponent, CosmonautEditComponent, CosmonautAddEditFormComponent, PaginatorComponent, PageNotFoundComponent],
  bootstrap:    [ AppComponent ],
  providers: [ CosmonautService ]
})
export class AppModule { }
