import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from 'src/app/models/contact.model';
import { ContactGroup } from './../../../models/contact-group.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() type: string;
  @Input() content: ContactGroup[] & Contact[];
  @Output() deleteEvent = new EventEmitter < { id: string, hasContacts: boolean } > ();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {}

  handleView(event: string) {
    this._router.navigate([`/contacts/${event}`]);
  }

  handleEdit(event: string) {
    this._router.navigate([`${event}`], {
      relativeTo: this._route
    });
  }

  handleDelete(event: { id: string, hasContacts: boolean }) {
    this.deleteEvent.emit(event);
  }
}
