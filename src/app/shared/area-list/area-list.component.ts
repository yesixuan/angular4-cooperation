import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Address } from '../../domain';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { getProvinces, getCitiesByProvince, getAreasByCity } from '../../utils/area.util';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => AreaListComponent),
     multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ]
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {
  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  };
  _province = new Subject<string>();
  _city = new Subject<string>();
  _district = new Subject<string>();
  _street = new Subject<string>();
  province$: Observable<string[]>;
  cities$: Observable<string[]>;
  districts$: Observable<string[]>;
  provinces = getProvinces();

  private _sub: Subscription;
  private propagateChange = (_: any) => {}

  constructor() { }

  ngOnInit() {
    // 将Subject变成Observable 
    const province$ = this._province.asObservable().startWith('');
    const city$ = this._city.asObservable().startWith('');
    const district$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    // 多个流组合用数组传递
    const val$ = Observable.combineLatest([province$, city$, district$, street$], (_p: string, _c: string, _d: string, _s: string) => {
      return {
        province: _p,
        city: _c,
        district: _d,
        street: _s
      };
    });
    this._sub = val$.subscribe(v => {
      this.propagateChange(v);
    });
    // 从函数中得到数组，再将数组转变成流
    this.province$ = Observable.of(getProvinces());
    this.cities$ = province$.map((p: string) => getCitiesByProvince(p));
    this.districts$ = Observable.combineLatest(province$, city$, (p, c) => getAreasByCity(p, c));
  }
  ngOnDestroy() {
    this._sub && this._sub.unsubscribe();
  }
  
  writeValue(obj: any): void{
    if (obj) {
      this._address = obj;
      // 将从外部得到的值发射到流中去
      if (this._address.province) {
        this._province.next(this._address.province);
      }
      if (this._address.city) {
        this._city.next(this._address.city);
      }
      if (this._address.district) {
        this._district.next(this._address.district);
      }
      if (this._address.street) {
        this._street.next(this._address.street);
      }
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
      return null
    }
    if(val.province && val.city && val.district && val.street) {
      return null
    }
    return {addressInvalid: true}
  }

  onProvinceChange() {
    this._province.next(this._address.province);
  }

  onCityChange() {
    this._city.next(this._address.city);
  }

  onDistrictChange() {
    this._district.next(this._address.district);
  }

  onStreetChange() {
    this._street.next(this._address.street);
  }
}
