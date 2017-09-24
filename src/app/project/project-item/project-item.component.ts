import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ]
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() onInvite = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDel = new EventEmitter<void>();
  // 给这个组件绑定动画
  @HostBinding('@card') cardState = 'out';

  constructor() { }

  ngOnInit() {
  }

  // 监听整个组件的mouseenter事件，还可以传入event对象
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover'
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out'
  }

  onInviteClick() {
    this.onInvite.emit();
  }

  onEditClick() {
    this.onEdit.emit();
  }

  onDelClick() {
    this.onDel.emit();
  }
}
