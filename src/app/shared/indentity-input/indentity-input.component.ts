import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Identity, IdentityType} from '../../domain';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-indentity-input',
  templateUrl: './indentity-input.component.html',
  styleUrls: ['./indentity-input.component.scss'],
  providers: [
    {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => IndentityInputComponent),
     multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IndentityInputComponent),
      multi: true
    }
  ]
})
export class IndentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  identityTypes: {value: IdentityType, label: string}[] = [
    {value: IdentityType.IdCard, label: '身份证'},
    {value: IdentityType.Insurance, label: '医保'},
    {value: IdentityType.Passport, label: '护照'},
    {value: IdentityType.Military, label: '军官证'},
    {value: IdentityType.Other, label: '其它'}
  ];
  identity: Identity = {identityType: null, identityNo: null};
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private _sub: Subscription;
  private propagateChange = (_: any) => {}

  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this.idNo, this.idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    })
    this._sub = val$.subscribe(id => {
      this.propagateChange(id)
    })
  }
  ngOnDestroy() {
    this._sub && this._sub.unsubscribe();
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }
  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }
  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }

  writeValue(obj: Identity): void{
    if(obj) {
      this.identity = obj;
    }
  }
  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void{ }

  // 动态验证就是这么玩的，根据不同的条件验证不同规则
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if(!val) {
      return null;
    }
    switch(val.identityType) {
      case IdentityType.IdCard: {
        return this.validateIdCard(c);
      }
      case IdentityType.Passport: {
        return this.validatePassport(c);
      }
      case IdentityType.Military: {
        return this.validateMilitary(c);
      }
      case IdentityType.Insurance:
      default: {
        return null;
      }
    }
  }
  validateIdCard(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 18) {
      return {idInvalid: true};
    }
    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val) ? null : {idInvalid: true}
  }
  validatePassport(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    if(val.length !== 9) {
      return {passportInvalid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    return pattern.test(val) ? null : {passportInvalid: true}
  }
  validateMilitary(c: FormControl): {[key: string]: any} {
    const val = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    return pattern.test(val) ? null : {passportInvalid: true}
  }
}
