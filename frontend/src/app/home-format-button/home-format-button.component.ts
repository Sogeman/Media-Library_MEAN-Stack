import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-home-format-button',
  templateUrl: './home-format-button.component.html',
  styleUrls: ['./home-format-button.component.css']
})
export class HomeFormatButtonComponent implements OnInit {

  @Input() format: { name: string, value: string };
  @Output() buttonPressed = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  pressedButton() {
    this.buttonPressed.emit(this.format.value);
  }

}
