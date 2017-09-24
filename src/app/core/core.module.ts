import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpModule } from '@angular/http';
import { loadSvgSesources } from '../utils/svg.util';
import { SharedModule } from '../shared/shared.module';

// 移动端需要的一些拖拽等操作
import 'hammerjs';
// rxjs相关导入
import 'rxjs/add/operator/take'
// 将路由模块从根模块移到coreModule中
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    // 动画模块一般放在所有模块最后，否则可能出现一些异常
    BrowserAnimationsModule,
    ServicesModule.forRoot()
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
    if(parent) {
      throw new Error("CoreModule已存在，不能再次加载！");
    }
    loadSvgSesources(ir, ds);
  }
}
