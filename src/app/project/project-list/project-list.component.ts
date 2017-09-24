import { Component, OnInit, HostBinding } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation]
})
export class ProjectListComponent implements OnInit {
  @HostBinding('@routeAnim') state;
  projects = [
    {
      "id": 1,
      "name": '企业协作平台',
      "desc": '这是一个企业内部项目',
      "coverImg": 'assets/img/covers/0.jpg'
    },
    {
      "id": 2,
      "name": '企业协作平台',
      "desc": '这是一个企业内部项目',
      "coverImg": 'assets/img/covers/1.jpg'
    }
  ]

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
    // 接收从弹框传过来的数据
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = [...this.projects, {
        "id": 3,
        "name": '不是企业协作平台',
        "desc": '这确实是一个企业内部项目',
        "coverImg": 'assets/img/covers/2.jpg'
      }]
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchEditDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
  }

  launchDelDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '小伙儿，你确定删除该项目？'}});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      this.projects = this.projects.filter(item => {
        return project.id !== item.id;
      })
    });
  }
}
