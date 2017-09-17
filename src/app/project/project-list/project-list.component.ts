import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      "name": '企业协作平台',
      "desc": '这是一个企业内部项目',
      "coverImg": 'assets/img/covers/0.jpg'
    },
    {
      "name": '企业协作平台',
      "desc": '这是一个企业内部项目',
      "coverImg": 'assets/img/covers/1.jpg'
    },
    {
      "name": '企业协作平台',
      "desc": '这是一个企业内部项目',
      "coverImg": 'assets/img/covers/2.jpg'
    }
  ]

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {dark: true}});
    // 接收从弹框传过来的数据
    dialogRef.afterClosed().subscribe(res => console.log(res))
  }

}
