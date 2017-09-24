import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  items = [
    {
      id: 1,
      name: 'zhangsan'
    },{
      id: 2,
      name: 'lisi'
    },{
      id: 3,
      name: 'wangwu'
    },{
      id: 4,
      name: 'zhaoliu'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  // 没必要为了user而单独定义一个User类，可以直接用这种对象展开的方式定义,注意分号
  displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }

}
