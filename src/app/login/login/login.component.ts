import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    cn: '能够轻易失去的，从来就不真正属于你！',
    en: 'to be, or not to be? this is a question.',
    pic: 'assets/quote_fallback.jpg'
  };

  constructor(private fb: FormBuilder, private quoteService$: QuoteService) { 
    this.quoteService$.getQuote()
      .subscribe(res => this.quote = res)
  }

  ngOnInit() {
    // 原始方式初始化表单
    /*this.form = new FormGroup({
      email: new FormControl('xuan@163.com', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.required)
    })*/
    // 利用FormBuilder初始化表单
    this.form = this.fb.group({
      // 最后一个是自定义校验器
      email: ['xuan@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    })
  }

  onSubmit({value, valid}, e: Event) {
    e.preventDefault();
    console.log(value)
    console.log(valid)
    // 一开始不设某项验证规则，而是提交的时候临时加上去（配合条件判断，动态验证）
    this.form.controls['email'].setValidators(this.validate)
  } 

  // 自定义同步校验规则
  validate(c: FormControl): {[key: string]: any} {
    if(!c.value) {
      return null
    }
    const pattern = /^xuan+/;
    if(pattern.test(c.value)) {
      return null
    }
    return {
      emailNotValid: '邮件名必须以"xuan"开头！'
    }
  }
}
