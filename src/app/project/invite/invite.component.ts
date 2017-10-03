import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { User } from '../../domain/user.model';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: User[] = []

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<InviteComponent>
  ) { }

  ngOnInit() {
    this.members = [...this.data.members]
  }

  // 没必要为了user而单独定义一个User类，可以直接用这种对象展开的方式定义,注意分号
  /*displayUser(user: {id: string; name: string}) {
    return user ? user.name : '';
  }*/

  onSubmit(ev: Event, {value, valid}) {
    ev.preventDefault();
    if(!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
}
