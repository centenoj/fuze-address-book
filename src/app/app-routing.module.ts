import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsComponent } from './components/route/groups/groups.component';
import { GroupUpsertComponent } from './components/route/groups/group-upsert/group-upsert.component';
import { ContactsComponent } from './components/route/contacts/contacts.component';
import { ContactUpsertComponent } from './components/route/contacts/contact-upsert/contact-upsert.component';
import { OfflineComponent } from './components/route/offline/offline.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/add', component: GroupUpsertComponent },
  { path: 'groups/:id', component: GroupUpsertComponent },
  { path: 'contacts/:id', component: ContactsComponent },
  { path: 'contacts/:id/add', component: ContactUpsertComponent },
  { path: 'contacts/:id/:name', component: ContactUpsertComponent },
  { path: 'offline', component: OfflineComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
