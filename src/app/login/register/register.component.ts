import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { extractInfo, isValidAddr, getAddrByCode } from '../../utils/identity.util';
import { isValidDate } from '../../utils/date.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  items: string[];
  sub: Subscription;
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    let _items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = _items.map(item => {
      return `avatars:svg-${item}`;
    })
    // 构建响应式表单
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1992-08-13'],
      identity: [],
      address: []
    })
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(_ => this.form.get('identity').valid);
    this.sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if(isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if(isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    })
  }
  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid) {
      return
    }
    console.log(value)
  }
}
