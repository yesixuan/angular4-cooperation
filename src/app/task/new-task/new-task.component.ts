import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {
  priorities = [
    {
      label: '紧急',
      value: 1
    },
    {
      label: '重要',
      value: 2
    },
    {
      label: '普通',
      value: 3
    },
  ];
  title: string = '';

  constructor(@Inject(MD_DIALOG_DATA) private data ) { }

  ngOnInit() {
    this.title = this.data.title;
    console.log(this.data)
  }

}
