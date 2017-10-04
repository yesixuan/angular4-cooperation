import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MdToolbarModule, 
  MdIconModule, 
  MdButtonModule,
  MdCardModule, 
  MdInputModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdRadioModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdSelectModule,
  MdSidenavModule,
  MdButtonToggleModule,
  MdChipsModule,
  MdTabsModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'
import { DirectiveModule } from '../directive/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IndentityInputComponent } from './indentity-input/indentity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    MdChipsModule,
    MdTabsModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageListSelectComponent, // 自己定义的选择头像表单组件 
    AgeInputComponent,
    ChipsListComponent, 
    IndentityInputComponent, 
    AreaListComponent
  ],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent, 
    AgeInputComponent, 
    ChipsListComponent, 
    IndentityInputComponent, 
    AreaListComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
