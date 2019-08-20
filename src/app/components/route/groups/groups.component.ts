import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BookClient } from './../../../client/book.client';
import { BookStore } from './../../../store/book.store';

import { AddressBook } from './../../../models/address-book.model';
import { ContactGroup } from './../../../models/contact-group.model';

import { constants } from '../../../constants';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  private _storeSubscription: Subscription;
  private groupId: string;

  isLoading = false;
  groups: ContactGroup[] = [];
  alert: { message: string, type: string, show: boolean } = {
    message: '',
    type: 'confirm',
    show: false
  };

  constructor(
    private _router: Router,
    private _client: BookClient,
    private _store: BookStore
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this._storeSubscription = this._store.state.subscribe(() => {
      this.isLoading = false;
      this.groups = this._store.getGroups();
    });

    this._client.getBook();
  }

  onAdd() {
    this._router.navigate(['/groups/add']);
  }

  handleDelete(event: { id: string, hasContacts: boolean }) {
    if (event.hasContacts) {
      this.alert.message = `Can't delete group. Please remove all contacts before deleting!`;
      this.alert.type = 'danger';
      this.alert.show = true;
    } else {
      this.groupId = event.id;
      this.alert.message = `Are you sure you want to delete the group?`;
      this.alert.type = 'confirm';
      this.alert.show = true;
    }
  }

  onModalClick(event) {
    if (event === 'confirm') {
      this.isLoading = true;
      this._client.deleteGroup(this.groupId).subscribe(() => {
        this._store.deleteContactGroup(this.groupId);
      }, () => {
        this.isLoading = false;
        this.alert.message = constants.DEFAULT_ERROR_MESSAGE;
        this.alert.type = 'danger';
        this.alert.show = true;
      });
    }
    this.alert.show = false;
  }

  ngOnDestroy() {
    if (this._storeSubscription) {
      this._storeSubscription.unsubscribe();
    }
  }
}
