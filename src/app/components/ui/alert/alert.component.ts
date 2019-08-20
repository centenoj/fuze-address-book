import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() message;
  @Input() type = 'confirm';
  @Output() modalEvent = new EventEmitter < string > ();

  cancelBtnText = 'Cancel';
  confirmBtnText = 'Confirm';

  constructor() {}

  ngOnInit() {
    if (this.type === 'danger') {
      this.cancelBtnText = 'OK';
    }
  }

  onConfirm() {
    this.modalEvent.emit('confirm');
  }

  onCancel() {
    this.modalEvent.emit('cancel');
  }

  onDispose(event) {
    if ((event.target).className === 'alert') {
      this.modalEvent.emit('cancel');
    }
  }

}
