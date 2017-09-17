import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  // MD_DIALOG_DATA是传进来的数据，MdDialogRef是要传出的数据
  constructor(
    @Inject(MD_DIALOG_DATA) private data, 
    private dialogRef: MdDialogRef<NewProjectComponent>,
    private oc: OverlayContainer
  ) { }

  ngOnInit() {
    this.oc.themeClass = this.data.dark? 'myapp-dark-theme': null;
  }

  onClick() {
    this.dialogRef.close('关闭时需要传出的数据');
  }

}
