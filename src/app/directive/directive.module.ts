import { NgModule } from '@angular/core';
import { DragDirective } from './drag-drop/drag.directive';
import { DropDirective } from './drag-drop/drop.directive';
import { DragDropService } from './drag-drop.service';

@NgModule({
  imports: [],
  declarations: [
    DragDirective, 
    DropDirective
  ],
  // 记得导出，不然这两个指令只能在这个模块中使用
  exports: [
    DragDirective,
    DropDirective
  ],
  providers: [
    DragDropService
  ]
})
export class DirectiveModule { }
