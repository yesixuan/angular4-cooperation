import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  // 指令的输入属性如何接收，请看[draggedClass]
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {
  @Input() draggedClass: string;
  private _isDraggable: boolean = false;
  @Input() dragTag: string; // 拖拽目标的唯一标识
  @Input() dragData: any; // 拖拽目标的数据

  // 再使用app-draggable="xx"时，会调用下面的set方法
  @Input('app-draggable')
  set isDraggable(val: boolean) {
    this._isDraggable = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`)
  }
  get isDraggable(): boolean {
    return this._isDraggable;
  }

  /*
  ElementRef是元素的引用，Renderer2相当于常用DOM操作函数库
  */
  constructor(
    private el: ElementRef, 
    private rd: Renderer2, 
    private service: DragDropService
  ) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(e: Event) {
    // 判断发起拖拽的是不是目标元素
    if(this.el.nativeElement === e.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData});
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEnd(e: Event) {
    if(this.el.nativeElement === e.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass)
    }
  }

}
