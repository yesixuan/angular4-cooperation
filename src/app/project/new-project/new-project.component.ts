import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title: string = '';
  coverImgs = [];
  form: FormGroup;

  // MD_DIALOG_DATA是传进来的数据，MdDialogRef是要传出的数据
  constructor(
    @Inject(MD_DIALOG_DATA) private data, 
    private dialogRef: MdDialogRef<NewProjectComponent>,
    // private oc: OverlayContainer
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.coverImgs = this.data.thumbnails;
    if(this.data.project) {
      this.title = '修改项目';
       // appComponent全局整了这个，所以这里不需要了
      // this.oc.themeClass = this.data.dark? 'myapp-dark-theme': null;
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      })
    }else {
      this.title = '新增项目';
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      })
    }
   
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid) {return}
    this.dialogRef.close(value);
  }

}
