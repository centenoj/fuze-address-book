import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { Contact } from './../../../models/contact.model';
import { ContactGroup } from './../../../models/contact-group.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) form: NgForm;
  @Input() type: string;
  @Input() content: ContactGroup & Contact;
  @Output() submitEvent = new EventEmitter < ContactGroup & Contact > ();

  saveBtnText = 'save';
  showAlert = false;
  model: Contact;

  constructor(
    private _location: Location
  ) {}

  private fillForm() {
    if (this.type === 'group') {
      this.form.setValue({
        name: this.content.name,
        description: this.content.description,
        pictureUrl: this.content.pictureUrl
      });
    } else if (this.type === 'contact') {
      this.form.setValue({
        name: this.content.name,
        phone: this.content.phone,
        pictureUrl: this.content.pictureUrl
      });
    }
  }

  ngOnInit() {
    if (this.content) {
      this.saveBtnText = 'update';
      setTimeout(() => this.fillForm());
    }
  }

  onSubmit() {
    this.showAlert = true;
  }

  onClear() {
    if (this.content) {
      this.fillForm();
    } else {
      this.form.reset();
    }
  }

  onCancel() {
    this.form.reset();
    this._location.back();
  }

  onModalClick(event) {
    if (event === 'confirm') {
      const value = this.form.value;
      this.submitEvent.emit(value);
    }
    this.showAlert = false;
  }

  ngOnDestroy() {}

}
