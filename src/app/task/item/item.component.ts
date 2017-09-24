import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    itemAnim
  ]
})
export class ItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() editItem = new EventEmitter<void> ();
  widerPriority = 'in';

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

  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'out'
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in'
  }
}
