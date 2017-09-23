import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() editItem = new EventEmitter<void> ();

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  editItemClick() {
    this.editItem.emit()
  }

  onCheckBoxClick(e: Event) {
    e.stopPropagation();
  }
}
