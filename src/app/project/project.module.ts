import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    ProjectListComponent, 
    ProjectItemComponent, 
    NewProjectComponent, 
    InviteComponent
  ],
  // 对话框组件需要用entryComponents元数据来装饰
  entryComponents: [
    NewProjectComponent, 
    InviteComponent
  ]
})
export class ProjectModule { }
