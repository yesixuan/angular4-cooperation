import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MdToolbarModule } from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if(parent) {
      throw new Error("CoreModule已存在，不能再次加载！");
    }
  }
}
