import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items: string[];

  constructor() { }

  ngOnInit() {
    // for(let i = 1; i <= 16; i++) {
    //   this.items[i-1] = `avatars:svg-${i}`;
    // }
    let _items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.items = _items.map(item => {
      return `avatars:svg-${item}`;
    })
  }

}
