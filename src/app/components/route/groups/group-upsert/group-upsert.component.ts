import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BookClient } from './../../../../client/book.client';
import { BookStore } from './../../../../store/book.store';

import { ContactGroup } from 'src/app/models/contact-group.model';

import { constants } from '../../../../constants';

@Component({
  selector: 'app-group-upsert',
  templateUrl: './group-upsert.component.html',
  styleUrls: ['./group-upsert.component.scss']
})
export class GroupUpsertComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  private _submitSubscription: Subscription;
  private snapshot: ActivatedRouteSnapshot;
  private action: string;

  title = '';
  isLoading = true;
  alert: {
    message: string,
    type: string,
    show: boolean
  } = {
    message: '',
    type: 'confirm',
    show: false
  };
  group: ContactGroup;

  constructor(
    private _store: BookStore,
    private _client: BookClient,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  private isNameTaken(name: string) {
    const groupFound = this._store.getGroupByName(name);
    return (Object.keys(groupFound).length === 0) ? false : true;
  }

  private createGroup(payload: ContactGroup) {
    if (this.isNameTaken(payload.name)) {
      this.isLoading = false;
      this.alert.message = `There is already a group with the name '${payload.name}'!`;
      this.alert.show = true;
    } else {
      this._submitSubscription = this._client.createGroup(payload.name, payload.description, payload.pictureUrl).subscribe(result => {
        this._store.addGroup(result);
        this._router.navigate(['groups']);
      }, () => {
        this.isLoading = false;
        this.alert.message = constants.DEFAULT_ERROR_MESSAGE;
        this.alert.show = true;
      });
    }
  }

  private updateGroup(payload: ContactGroup) {
    if ((payload.name !== this.group.name) && this.isNameTaken(payload.name)) {
      this.isLoading = false;
      this.alert.message = `There is already a group with the name '${payload.name}'!`;
      this.alert.show = true;
    } else {
      this._submitSubscription = this._client.updateGroup(
        this.group.id, payload.name, payload.description, payload.pictureUrl)
        .subscribe(result => {
        this._store.updateContactGroup(this.group.id, result);
        this._router.navigate(['groups']);
      }, () => {
        this.isLoading = false;
        this.alert.message = constants.DEFAULT_ERROR_MESSAGE;
        this.alert.show = true;
      });
    }
  }

  ngOnInit() {
    this.snapshot = this._route.snapshot;
    this.action = (this.snapshot.params.id) ? 'edit' : 'add';

    this.title = `${this.action} group`;

    if (Object.keys(this._store.getBook()).length === 0) {
      this._subscription = this._store.state.subscribe(() => {
        if (this.action === 'edit') {
          this.group = this._store.getGroup(this.snapshot.params.id);
          this._subscription.unsubscribe();
        }
        this.isLoading = false;
      });

      this._client.getBook();
    } else {
      if (this.action === 'edit') {
        this.group = this._store.getGroup(this.snapshot.params.id);
      }
      this.isLoading = false;
    }

  }

  handleSubmit(event) {
    this.isLoading = true;
    if (this.action === 'add') {
      this.createGroup(event);
    } else if (this.action === 'edit') {
      this.updateGroup(event);
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
