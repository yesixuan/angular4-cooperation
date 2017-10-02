import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task, TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
  private readonly domain = 'tasks';
  // 这个Header类，编辑器没有提示自动导入，要手写，切记！
  private headers = new Headers({
    'Content-Type': 'application/json'
  })
  
  constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

  // POST
  add(task: Task): Observable<Task> {
    task.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(task), {headers: this.headers})
      .map(res => res.json());
  }
  // PUT
  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc: task.desc,
      priority: task.priority,
      dueDate: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    }
    return this.http
      // patch可以只更新这条记录的某些字段（ID不更新）
      .patch(uri, JSON.stringify(task), {headers: this.headers})
      .map(res => res.json());
  }
  // DELETE
  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/taskLists/${task.id}`;
    return this.http
      .delete(uri)
      .mapTo(task);
  }
  // GET
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {"taskListId": taskListId}})
      .map(res => res.json() as Task[]);
  }
  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id))
      .reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []);
  }
  // 完成任务
  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      // patch可以只更新这条记录的某些字段（ID不更新）
      .patch(uri, JSON.stringify({completed: !task.completed}), {headers: this.headers})
      .map(res => res.json());
  }
  // 移动任务
  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http
      // patch可以只更新这条记录的某些字段（ID不更新）
      .patch(uri, JSON.stringify({taskListId: taskListId}), {headers: this.headers})
      .map(res => res.json());
  }
  // 移动所有任务
  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((arr, x) => [...arr, x], []);
  }
}