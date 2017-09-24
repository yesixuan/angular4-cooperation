import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() header = '';
  @Output() newTask = new EventEmitter<void> ()
  @Output() moveAll = new EventEmitter<void> ()
  @Output() removeList = new EventEmitter<void> ()
  @Output() editList = new EventEmitter<void> ()

  constructor() { }

  ngOnInit() {
  }

  onNewTaskClick() {
    this.newTask.emit()
  }

  onMoveAllClick() {
    this.moveAll.emit()
  }

  onDelListClick() {
    this.removeList.emit()
  }

  onEditListClick() {
    this.editList.emit();
  }
}
