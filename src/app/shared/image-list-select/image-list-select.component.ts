import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      // 当你在表单中使用formControlName时，系统就会往NG_VALUE_ACCESSOR令牌里找
      provide: NG_VALUE_ACCESSOR,
      // forwardRef()是因为如果直接写，组件还没初始化好
      useExisting: forwardRef(() => ImageListSelectComponent),
      // 多个组件类可能都会用到这个令牌
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor  {
  @Input() cols: number = 6;
  @Input() rowHeight: string = '64px';
  @Input() title: string = '请选择';
  @Input() items: string[] = [];
  @Input() useSvgIcon: boolean = false;
  @Input() itemWidth: string = '80px';
  selected: string;
 
  constructor() { }
  private propagateChange = (_: any) => {}

  // 再使用该组件的表单中，可以使用该方法修改值（表单控制组件）
  writeValue(obj: any): void{
    this.selected = obj;
  }
  // 发生改变时的回调函数给到你（组件变化了告诉表单）
  registerOnChange(fn: any): void{
    // 主要是为了拿到这个函数，一旦有变化，将变化的值传给该函数，该函数就会通知表单
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void{ }

  onChange(i) {
    this.selected = this.items[i];
    // 一旦有变化，将值发送过去通知表单
    this.propagateChange(this.selected);
  }

  // 验证通过就返回null否则返回字典
  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListValid: {
        valid: false
      }
    }
  }
}
