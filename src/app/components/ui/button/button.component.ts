import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() message: string;
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() btnType = 'primary';
  @Output() clickEvent = new EventEmitter < void > ();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.clickEvent.emit();
  }
}
