import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  // 这个Header类，编辑器没有提示自动导入，要手写，切记！
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  // POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }
  // PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    }
    return this.http
      // patch可以只更新这条记录的某些字段（ID不更新）
      .patch(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }
  // DELETE
  del(project: Project): Observable<Project> {
    // 删除任务列表
    const delTask$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.url}/taskLists/${listId}`))
      .count()
    // 任务列表删除完，就删除项目
    return delTask$
      .switchMap(() => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }
  // GET
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {"members_like": userId}})
      .map(res => res.json() as Project[]);
  }
}