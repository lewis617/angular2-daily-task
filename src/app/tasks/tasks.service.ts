// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable }     from 'rxjs/Observable';
import construct = Reflect.construct;

import { AuthService } from '../auth.service';

export class Task {
  id: number;
  user: string;
  content: string;
  date: Date;
}

@Injectable()
export class TasksService {
  private tasksUrl = 'app/tasks';  // URL to web API

  constructor(private http: Http, private authService: AuthService) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addTask(content: string): Observable<Task> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let user = this.authService.user.name;
    let date = new Date();

    return this.http.post(this.tasksUrl, {content, user, date}, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}


@Injectable()
export class TasksResolve implements Resolve<Task> {
  constructor(private taskService: TasksService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Task[]> {
    return this.taskService.getTasks();
  }
}
