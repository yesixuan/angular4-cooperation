import { NgModule } from '@angular/core';
import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ItemComponent } from './item/item.component';
import { HeaderComponent } from './header/header.component';
import { TaskRoutingModule } from './task-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    TaskRoutingModule,
    // 要使用material中的组件，要引入SharedModule
    SharedModule
  ],
  declarations: [
    TaskHomeComponent, 
    TaskListComponent, 
    ItemComponent, 
    HeaderComponent
  ]
})
export class TaskModule { }
