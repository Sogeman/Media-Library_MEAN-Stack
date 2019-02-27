import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  @Output() delete = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Input() parent: string;
  @Input() mediaId: string;

  constructor() { }

  ngOnInit() {
  }

  confirmDelete() {
    this.delete.emit();
  }

  cancelDelete() {
    this.cancel.emit();
  }

}
