import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  items: string[];
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
      dateOfBirth: ['1992-08-13']
    })
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid) {
      return
    }
    console.log(value)
  }
}
