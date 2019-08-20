import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { BookClient } from './../../../../client/book.client';
import { BookStore } from './../../../../store/book.store';

import { Contact } from 'src/app/models/contact.model';

import { constants } from '../../../../constants';

@Component({
  selector: 'app-contact-upsert',
  templateUrl: './contact-upsert.component.html',
  styleUrls: ['./contact-upsert.component.scss']
})
export class ContactUpsertComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private _submitSubscription: Subscription;
  private snapshot: ActivatedRouteSnapshot;
  private action: string;

  title = '';
  isLoading = true;
  alert: { message: string, type: string, show: boolean } = {
    message: '',
    type: 'confirm',
    show: false
  };
  contact: Contact;

  constructor(
    private _store: BookStore,
    private _client: BookClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  private isNameTaken(name: string) {
    const contactFound = this._store.getContact(name);
    return (Object.keys(contactFound).length === 0) ? false : true;
  }

  private createContact(payload: Contact) {
    if (this.isNameTaken(payload.name)) {
      this.isLoading = false;
      this.alert.message = `There is already a contact with the name '${payload.name}'!`;
      this.alert.show = true;
    } else {
      this._submitSubscription = this._client.createContact(this.snapshot.params.id, payload.name, payload.phone, payload.pictureUrl)
        .subscribe(result => {
        this._store.addContact(result);
        this._router.navigate([`contacts/${this.snapshot.params.id}`]);
      }, () => {
        this.isLoading = false;
        this.alert.message = constants.DEFAULT_ERROR_MESSAGE;
        this.alert.show = true;
      });
    }
  }

  private updateContact(payload: Contact) {
    this._submitSubscription = this._client.updateContact(this.contact.groupId, this.contact.name, payload.phone, payload.pictureUrl)
    .subscribe(result => {
      this._store.updateContact(this.contact.name, result);
      this._router.navigate([`contacts/${this.contact.groupId}`]);
    }, () => {
      this.isLoading = false;
      this.alert.message = constants.DEFAULT_ERROR_MESSAGE;
      this.alert.show = true;
    });
  }

  ngOnInit() {
    this.snapshot = this._route.snapshot;
    this.action = (this.snapshot.params.name) ? 'edit' : 'add';

    this.title = `${this.action} contact`;

    if (Object.keys(this._store.getBook()).length === 0) {
      this._subscription = this._store.state.subscribe(() => {
        if (this.action === 'edit') {
          this.contact = this._store.getContact(this.snapshot.params.name);
          this._subscription.unsubscribe();
        }
        this.isLoading = false;
      });

      this._client.getBook();
    } else {
      if (this.action === 'edit') {
        this.contact = this._store.getContact(this.snapshot.params.name);
      }
      this.isLoading = false;
    }
  }

  handleSubmit(event) {
    this.isLoading = true;
    if (this.action === 'add') {
      this.createContact(event);
    } else if (this.action === 'edit') {
      this.updateContact(event);
    }
  }

  onModalClick(event) {
    this.alert.show = false;
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this._submitSubscription) {
      this._submitSubscription.unsubscribe();
    }
  }

}
