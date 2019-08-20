import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { BookStore } from './../store/book.store';

import { AddressBook } from './../models/address-book.model';

import { createGuid } from '../tools/tools';
import { constants } from '../constants';

@Injectable({ providedIn: 'root' })
export class BookClient {

  constructor(
    private _http: HttpClient,
    private _store: BookStore,
    private _router: Router
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }

  // ADDRESS BOOK

  getBook(): void {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}`;
    this._http.get < any > (url).pipe(
      map(data => data.value),
      catchError(this.handleError)
    ).subscribe((book: AddressBook) => {
      this._store.updateAddressBook(book);
    }, (errorMessage) => {
      console.error(errorMessage);
      this._router.navigate(['offline']);
    });
  }

  // CONTACT GROUPS

  createGroup(name: string, description: string = '', pictureUrl: string = '') {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}/groups/`;
    const payload = { id: createGuid(24), name, description, pictureUrl };

    return this._http.post < any > (url, payload).pipe(
      map(data => data.value),
      catchError(this.handleError)
    );
  }

  updateGroup(id: string, name: string, description: string, pictureUrl: string) {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}/groups/${id}`;
    const payload = { id, name, description, pictureUrl };

    return this._http.put < any > (url, payload).pipe(
      map(data => data.value)
    );
  }

  deleteGroup(id: string) {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}/groups/${id}/`;
    return this._http.delete < any > (url);
  }

  // CONTACTS

  createContact(groupId: string, name: string, phone: string = '', pictureUrl: string = '') {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}/contacts/`;
    const payload = { groupId, name, phone, pictureUrl };

    return this._http.post < any > (url, payload).pipe(
      map(data => data.value)
    );
  }

  updateContact(groupId: string, name: string, phone: string, pictureUrl: string) {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}/contacts/${name}`;
    const payload = { groupId, name, phone, pictureUrl };

    return this._http.put < any > (url, payload).pipe(
      map(data => data.value)
    );
  }

  deleteContact(name: string) {
    const url = `${constants.ENDPOINT}${constants.BOOK_ID}/contacts/${name}/`;
    return this._http.delete < any > (url);
  }
}
