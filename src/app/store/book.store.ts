import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AddressBook } from '../models/address-book.model';
import { ContactGroup } from '../models/contact-group.model';
import { Contact } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class BookStore {

  private _state = new Subject < AddressBook > ();
  private addressBook: AddressBook;

  get state() {
    return this._state.asObservable();
  }

  // ADDRESS BOOK

  getBook(): AddressBook {
    return Object.assign({}, this.addressBook);
  }

  updateAddressBook(payload: AddressBook): void {
    this.addressBook = payload;
    this._state.next(this.addressBook);
  }

  // CONTACT GROUPS

  getGroups(): ContactGroup[] {
    return this.addressBook.groups.slice();
  }

  getGroup(id: string): ContactGroup {
    const group = this.addressBook.groups.find(grp => grp.id === id);
    return Object.assign({}, group);
  }

  getGroupByName(name: string): ContactGroup {
    const group = this.addressBook.groups.find(grp => grp.name.toLowerCase() === name.toLowerCase());
    return Object.assign({}, group);
  }

  getGroupContacts(id: string): Contact[] {
    const contacts = this.addressBook.contacts.filter(cnct => cnct.groupId === id);
    return contacts.slice();
  }

  addGroup(payload: ContactGroup): void {
    const bookClone = Object.assign({}, this.addressBook);
    bookClone.groups.push(payload);
    this.addressBook = bookClone;

    this._state.next(this.addressBook);
  }

  updateContactGroup(id: string, payload: ContactGroup): void {
    const bookClone = Object.assign({}, this.addressBook);
    const updatedGroup = bookClone.groups.find(grp => grp.id === id);
    updatedGroup.name = payload.name;
    updatedGroup.description = payload.description;
    updatedGroup.pictureUrl = payload.pictureUrl;
    this.addressBook = bookClone;

    this._state.next(this.addressBook);
  }

  deleteContactGroup(payload: string): void {
    const bookClone = Object.assign({}, this.addressBook);
    bookClone.groups = bookClone.groups.filter(grp => grp.id !== payload);
    this.addressBook = bookClone;

    this._state.next(this.addressBook);
  }

   // CONTACTS

   getContact(name: string): Contact {
    const contact = this.addressBook.contacts.find(cnct => cnct.name.toLowerCase() === name.toLowerCase());
    return Object.assign({}, contact);
  }

   addContact(payload: Contact): void {
    const bookClone = Object.assign({}, this.addressBook);
    bookClone.contacts.push(payload);
    this.addressBook = bookClone;

    this._state.next(this.addressBook);
  }

  updateContact(name: string, payload: Contact): void {
    const bookClone = Object.assign({}, this.addressBook);
    const updatedContact = bookClone.contacts.find(cnct => cnct.name === name);
    updatedContact.name = payload.name;
    updatedContact.phone = payload.phone;
    updatedContact.pictureUrl = updatedContact.pictureUrl;
    this.addressBook = bookClone;

    this._state.next(this.addressBook);
  }

   deleteContact(payload: string): void {
     const bookClone = Object.assign({}, this.addressBook);
     bookClone.contacts = bookClone.contacts.filter(cnct => cnct.name !== payload);
     this.addressBook = bookClone;

     this._state.next(this.addressBook);
   }
}
