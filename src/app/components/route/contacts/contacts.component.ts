import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BookClient } from 'src/app/client/book.client';
import { BookStore } from 'src/app/store/book.store';

import { AddressBook } from 'src/app/models/address-book.model';
import { Contact } from 'src/app/models/contact.model';

import { constants } from '../../../constants';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private _params: Params;

  isLoading = false;
  contacts: Contact[] = [];
  contactId = '';
  alert: { message: string, type: string, show: boolean } = {
    message: '',
    type: 'confirm',
    show: false
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _client: BookClient,
    private _store: BookStore
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this._params = this._route.snapshot.params;

    this._subscription = this._store.state.subscribe((book: AddressBook) => {
      this.isLoading = false;
      this.contacts = this._store.getGroupContacts(this._params.id);
    });
    this._client.getBook();
  }

  onAdd() {
    this._router.navigate(['add'], {
      relativeTo: this._route
    });
  }

  onBack() {
    this._router.navigate(['groups']);
  }

  handleDelete(event) {
    this.contactId = event.id;
    this.alert.message = 'Are you sure you want to delete the contact?';
    this.alert.type = 'confirm';
    this.alert.show = true;
  }

  onModalClick(event) {
    if (event === 'confirm') {
      this.isLoading = true;
      this._client.deleteContact(this.contactId).subscribe(data => {
        this._store.deleteContact(this.contactId);
      }, (errorMessage) => {
        this.isLoading = false;
        this.alert.message = constants.DEFAULT_ERROR_MESSAGE;
        this.alert.type = 'danger';
        this.alert.show = true;
      });
    }
    this.alert.show = false;
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
