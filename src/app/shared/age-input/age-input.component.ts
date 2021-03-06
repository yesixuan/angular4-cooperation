import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { 
  parse, 
  isBefore, 
  subDays, 
  differenceInDays, 
  subMonths, 
  differenceInYears, 
  differenceInMonths, 
  format,
  subYears,
  isDate,
  isValid,
  isFuture
} from 'date-fns';
import { isValidDate } from '../../utils/date.util';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

export enum AgeUnit {
  Year = 0,
  Month,
  Day
}
export interface Age {
  age: number;
  unit: AgeUnit;
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => AgeInputComponent),
     multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    }
  ]
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  @Input() format = 'YYYY-MM-DD';
  selectedUnit = AgeUnit.Year;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '日'},
  ]
  form: FormGroup;
  sub: Subscription;
  private propagateChange = (_: any) => {}

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      birthday: ['', this.validdateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      // 组合验证需要知道哪几个控件参与了，但这个函数也是要得到FormGroup对象的，通过返回函数来玩
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
    })
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges
      .map(d => {
        return {date: d, from: 'birthday'}
      })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.value);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const age$ = Observable
      .combineLatest(ageNum$, ageUnit$, (_n, _u) => {
        return this.toDate({age: _n, unit: _u})
      })
      .map(d => {
        return {date: d, from: 'age'}
      })
      .filter(_ => this.form.get('age').valid)
    const merged$ = Observable.merge(birthday$, age$)
      .filter(_ => this.form.valid)
    // 订阅流
    this.sub = merged$.subscribe((d) => {
      const age = this.toAge(d.date);
      if(d.from === 'birthday') {
        if(age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false})
        }
        if(age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit; 
          ageUnit.patchValue(age.unit, {emitEvent: false})
        }
      }else {
        const ageToCompare = this.toAge(birthday.value);
        if(ageToCompare.age !== age.age || ageToCompare.unit !== age.unit) {
          birthday.patchValue(d.date, {emitEvent: false});
          this.propagateChange(d.date);
        }
      }
    })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
  
  // 外部给该控件赋初始值时用到这个函数
  writeValue(obj: any): void{
    if(obj) {
      const date = format(obj, this.format);
      this.form.get('birthday').patchValue(date);
      const age = this.toAge(date);
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }
  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void{ }

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, this.daysTop), date) ?
      {age: differenceInMonths(now, date), unit: AgeUnit.Day} :
        isBefore(subMonths(now, this.monthsTop), date) ?
          {age: differenceInDays(now, date), unit: AgeUnit.Month} :
            {age: differenceInYears(now, date), unit: AgeUnit.Year}
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }

  validate(c: FormControl): {[key: string]: any} {
   const val = c.value;
   if(!val) {
     return null
   }
   if(isValidDate(val)) {
     return null
   }
   return {dateForBirthInvalid: true}
  }

  validdateDate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    return isValidDate(val) ? null : {
        birthdayInvalid: true
      }
  }

  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsBottom;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : {ageInvalid: true};
    }
  }
}
