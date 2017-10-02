import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  // 将默认的检查机制改成只有当外部发生改变时才检查这个组件的策略
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnim') state;
  projects;
  sub: Subscription;

  /* 
  ChangeDetectorRef是当我们将这个组件的检查机制改成OnPush时
  明确告诉angular在某个操作后还是要 检查的，避免angular不检查或盲目检查
  */
  constructor(
    private dialog: MdDialog, 
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) { }

  ngOnInit() {
    this.sub = this.service$.get("1")
      .subscribe(projects => {
        this.projects = projects;
        this.cd.markForCheck();
      })
  }
  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), img: selectedImg}}
    );
    // 接收从弹框传过来的数据
    dialogRef.afterClosed()
      .take(1) // 只接收一次值，这样就不用手动取消订阅了
      .filter(n => n) // 要让流里面确保有值
      .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)})) // 缩略图变原图
      .switchMap(v => this.service$.add(v))
      .subscribe(project => {
        this.projects = [...this.projects, project];
        // 告诉angular在这个点上，你来检查我
        this.cd.markForCheck();
      });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchEditDialog(project: Project) {
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), project: project}}
    );
    // 接收从弹框传过来的数据
    dialogRef.afterClosed()
      .take(1) // 只接收一次值，这样就不用手动取消订阅了
      .filter(n => n) // 要让流里面确保有值
      .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)})) // 缩略图变原图
      .switchMap(v => this.service$.update(v))
      .subscribe(project => {
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)];
        // 告诉angular在这个点上，你来检查我
        this.cd.markForCheck();
      });
  }

  launchDelDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '小伙儿，你确定删除该项目？'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter(item => {
          return prj.id !== item.id;
        })
        this.cd.markForCheck();
      });
  }

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`)
  }

  // 有缩略图得到原始图
  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
}
