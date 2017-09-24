import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;
  lists = [
    {
      id: 1,
      name: '代办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克麦咖啡',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务一：去星巴克买酒，还能埋设么么',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          remineder: new Date()
        }
      ]
    },
    {
      id: 2,
      name: '已办',
      tasks: [
        {
          id: 1,
          desc: '任务一：搬砖',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          remineder: new Date()
        },
        {
          id: 2,
          desc: '任务一：搬水泥',
          completed: true,
          priority: 2,
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date()
        }
      ]
    },
    {
      id: 3,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务一：去满啥啊',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-15'
          },
          dueDate: new Date(),
          remineder: new Date()
        }
      ]
    }
  ]

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    // 打开弹窗（弹窗需要在模块的entryComponents中声明）
    this.dialog.open(NewTaskComponent, {data: {title: '新增任务'}})
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}})
  }

  launchEditItem(task){
    this.dialog.open(NewTaskComponent, {data: {title: '编辑任务', task: task}})
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除列表', content: '小伙儿，你qio定要删除该列表吗？'}})
    dialogRef.afterClosed().subscribe(res => {console.log(res)})
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改列表名称'}})
    dialogRef.afterClosed().subscribe(res => {console.log(res)})
  }

  LaunchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建列表'}})
    dialogRef.afterClosed().subscribe(res => {console.log(res)})
  }
}
