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
