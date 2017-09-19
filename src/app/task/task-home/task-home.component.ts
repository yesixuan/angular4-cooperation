import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
  lists = [
    {
      id: 1,
      name: '代办',
      tasks: [
        {
          id: 1,
          desc: '任务一：去星巴克麦咖啡',
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-11'
          },
          dueData: new Date()
        },
        {
          id: 2,
          desc: '任务一：去星巴克买酒',
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-12'
          },
          dueData: new Date()
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
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-13'
          },
          dueData: new Date()
        },
        {
          id: 2,
          desc: '任务一：搬水泥',
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-14'
          },
          dueData: new Date()
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
          owner: {
            id: 1,
            name: 'xiaoming',
            avatar: 'avatars:svg-15'
          },
          dueData: new Date()
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
