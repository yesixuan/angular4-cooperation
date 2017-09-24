## svg字体图标的统一注册
### 注册svg的方法
app/utils/svg.util.ts
```js
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgSesources = (ir: MdIconRegistry, ds: DomSanitizer) => {
  // 注册自定义的svg图标，‘frees’是图标的名字，后面是路径（解析路径需要HttpMudule模块）
  ir.addSvgIcon('frees', ds.bypassSecurityTrustResourceUrl('assets/优惠券.svg'));     
}
```
### 通过Coremodule统一导入
core/core.module.ts
```js
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { loadSvgSesources } from '../utils/svg.util';

// ***
export class CoreModule {
  constructor(
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    loadSvgSesources(ir, ds);
  }
}
```
### 将CoreModule导入根模块
```js
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule
  ]
})
```

## 创建登录模块
### 登录模块的路由
app/login/login-routing.module.ts
```js
// 键入‘ngrout’可以生成路由片段，但是要稍作调整
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  // 模块中的路由都是‘forChikd’
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
```
### LoginModule
app/login/login.module.ts
```js
// ***
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    LoginRoutingModule
  ],
})
// ***
```
### 创建根路由
app/app-routing.module.ts
```js
// ***
const routes: Routes = [
  // 重定向，并且一旦路径匹配就填充路径
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  // 跟路由自然用‘forRoot’
  imports: [RouterModule.forRoot(routes)]
})
// ***
```
### 根模块
app/app.module.ts
```js
// ***
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    AppRoutingModule,
    LoginModule
  ],
})
// ***
```

## 动画
### 定义动画
app/anim/item.anim.ts
```js
import { trigger, state, style, transition, animate } from "@angular/animations";
export const itemAnim = trigger('item', [
  state('in', style({'border-left-width': '3px'})),
  state('out', style({'border-left-width': '8px'})),
  transition('out => in', animate('100ms ease-in')),
  transition('in => out', animate('100ms ease-out'))
])
```

### 给要添加动画的元素添加属性
```html
<!-- 'item'是根据在元数据的animations选项中的'trigger'参数来确定的，"widerPriority"是存放元素样式状态的成员变量 -->
<md-list-item [@item]="widerPriority"></md-list-item>
```

### 运用动画
```js
// 引入动画定义文件
import { itemAnim } from '../../anims/item.anim';
@Component({
  // ***
  animations: [ itemAnim ]
  // ***
  // 组件类中，'in'是元素的某个状态，通过状态切换来实现动画
  widerPriority = 'in';
  // 使用动画
  @HostListener('mouseenter') // 相当与添加监听函数
  onMouseEnter() {
    this.widerPriority = 'out';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in';
  }
})
```

 ### 给整个组件运用动画
 ```js
 // 给整个组件运用动画不好直接在元素上加属性（不然每次使用该组件都要写上同样的动画属性）
 @HostBinding('@card') cardState = 'out'; // 其实就是给整个组件加上'@card'属性并赋值
 ```

### 给路由组件加动画
定义路由组件：  
```js
import { trigger, state, style, transition, animate, group } from "@angular/animations";

export const slideToRight = trigger('routeAnim', [
  // 加上fixed是因为我们通过flex容器来让元素居中，所以如果不加的话，会有元素调整位置居中的过程
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  // 'void => *'别名为enter; '* => void'别名为leave
  transition('void => *', [
    style({'transform': 'translateX(-100%)', 'opacity': '0'}),
    // group可以对动画进行更细微的调整
    group([
      animate('.5s ease-in-out', style({'transform': 'translateX(0)'})),
      animate('.3s ease-in', style({'opacity': '1'}))
    ])
  ]),
  transition('* => void', [
    style({'transform': 'translateX(0)', 'opacity': '1'}),
    group([
      animate('.5s ease-in-out', style({'transform': 'translateX(100%)'})),
      animate('.3s ease-in', style({'opacity': '0'}))
    ])
  ])
])
```
每个路由组件中：  
```js
import { slideToRight } from '../../anims/router.anim';
@Component({
  // ***
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state; // 导入了slideToRight才能用@routeAnim
}
```

### 列表项增删时的动画
定义动画：  
```js
import { trigger, state, style, transition, animate, group, query, stagger } from "@angular/animations";

export const listAnimation = trigger('listAnim', [
  transition('* => *', [
    /* 
    列表中可能出现没有子元素的情况，所以建议加上{optional: true} 
    stagger可以让多个列表元素依次执行动画
    */
    query(':enter', style({'opacity': '0'}), {optional: true}), 
    query(':enter', stagger(100, [
      animate('1s', style({'opacity': '1'}))
    ]), {optional: true}),
    query(':leave', style({'opacity': '1'}), {optional: true}),
    query(':leave', stagger(100, [
      animate('1s', style({'opacity': '0'}))
    ]), {optional: true})
  ])
])
```
给元素添加动画属性：  
```html
<!-- projects.length发生改变就会触发动画 -->
<div [@listAnim]="projects.length">
  <app-project-item></app-project-item>
</div>
```
导入动画：  
```js
import { listAnimation } from '../../anims/list.anim';

@Component({
  // ***
  animations: [listAnimation]
})
```

## 改变angular的默认检查策略
angular的默认检查策略是在事件、ajax、定时器触发时检查整个组件树。  
但是如果你的某个组件的改变完全取决于外部，此时就需要改变检查策略为OnPush。  
如果某个组件会自己改变自己，而你又改变策略为OnPush，此时需要在改变自身的操作的地方打上标记，明确告诉angular过来检查。  
注意：如果父组件改变策略为OnPush，而子组件策略还是默认的，那么在事件、ajax、定时器触发时angular会顺带检查该父组件。  
```js
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  // ***
  // 将默认的检查机制改成只有当外部发生改变时才检查这个组件的策略
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectListComponent implements OnInit {
  /* 
  ChangeDetectorRef是当我们将这个组件的检查机制改成OnPush时
  明确告诉angular在某个操作后还是要 检查的，避免angular不检查或盲目检查
  */
  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) { }

  openNewProjectDialog() {
    // *** 给数组增加了一项
    // 告诉angular在这个点上，你来检查我
    this.cd.markForCheck();
  }
}
```


