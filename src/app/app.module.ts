import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './components/ui/header/header.component';
import { GroupsComponent } from './components/route/groups/groups.component';
import { GroupUpsertComponent } from './components/route/groups/group-upsert/group-upsert.component';
import { ContactsComponent } from './components/route/contacts/contacts.component';

import { LoadingComponent } from './components/ui/loading/loading.component';
import { ButtonComponent } from './components/ui/button/button.component';
import { CardComponent } from './components/ui/card/card.component';
import { GridComponent } from './components/ui/grid/grid.component';
import { FormComponent } from './components/ui/form/form.component';
import { ContactUpsertComponent } from './components/route/contacts/contact-upsert/contact-upsert.component';
import { TitleComponent } from './components/ui/title/title.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { OfflineComponent } from './components/route/offline/offline.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GroupsComponent,
    GroupUpsertComponent,
    ContactsComponent,
    ContactUpsertComponent,
    LoadingComponent,
    ButtonComponent,
    CardComponent,
    GridComponent,
    FormComponent,
    TitleComponent,
    AlertComponent,
    OfflineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
