import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BookStore } from './../../../store/book.store';

import { Contact } from './../../../models/contact.model';
import { ContactGroup } from './../../../models/contact-group.model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private contactCount = 0;

  @Input() content: ContactGroup & Contact;
  @Input() type: string;
  @Output() deleteEvent = new EventEmitter < { id: string, hasContacts: boolean } > ();
  @Output() editEvent = new EventEmitter < string > ();
  @Output() viewEvent = new EventEmitter < string > ();

  card: ContactGroup & Contact;
  contactInfo = '';
  cardBody = '';

  constructor(
    private _store: BookStore
  ) {}

  private getCardImage() {
    if (this.type === 'group') {
      return this.card.pictureUrl === '' ? '../../../../assets/images/contact_group.png' : this.card.pictureUrl;
    } else if (this.type === 'contact') {
      return this.card.pictureUrl === '' ? '../../../../assets/images/contact.png' : this.card.pictureUrl;
    }
    return this.card.pictureUrl;
  }

  private getContactCount() {
    const contacts = this._store.getGroupContacts(this.card.id);
    return contacts.length;
  }

  private getContactsInfo() {
    if (this.contactCount === 0) {
      return 'No contacts';
    } else if (this.contactCount === 1) {
      return '1 contact';
    } else {
      return `${this.contactCount} contacts`;
    }
  }

  ngOnInit() {
    this.card = Object.assign({}, this.content);
    this.cardBody = (this.card.description) ? this.card.description : this.card.phone;
    this.card.pictureUrl = this.getCardImage();

    if (this.type === 'group') {
      this.contactCount = this.getContactCount();
      this.contactInfo = this.getContactsInfo();
    }
  }

  onView() {
    this.viewEvent.emit(this.card.id);
  }

  onEdit() {
    if (this.type === 'group') {
      this.editEvent.emit(this.card.id);
    } else if (this.type === 'contact') {
      this.editEvent.emit(this.card.name);
    }
  }

  onDelete() {
    const payload = {
      id: this.type === 'group' ? this.card.id : this.card.name,
      hasContacts: this.contactCount > 0 ? true : false
    };
    this.deleteEvent.emit(payload);
  }

}
