import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Scrumuser, ScrumUserLoginData, CreateNewProject, ChangeRole, LoginCred,  Creategoal} from './scrumuser';
import {Observable} from 'rxjs/Rx';
import {Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {
  token: any;
  logincred: any;
  body: string;

  constructor(private _http: HttpClient, private _router:Router) { }

  _url = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/';

  _loginurl = 'https://liveapi.chatscrum.com/scrum/api-token-auth/';

  _scrumProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojects/';

  _taskUpdateUrl = ' https://liveapi.chatscrum.com/scrum/api/scrumgoals/';

  _changerole = 'https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/';

  _sprintUrl = "https://liveapi.chatscrum.com/scrum/api/scrumsprint/";


public httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

  signup(user: Scrumuser) {
    return this._http.post<any>(this._url, {'email':user['email'], 'password':user['password'], 'full_name': user['fullname'], 'usertype':user['usertype'], 'projectname':user['projectname']}, this.httpOptions);
  }

  login(user: ScrumUserLoginData) {
    return this._http.post<any>(this._loginurl, {'username':user['email'], 'password':user['password'], 'project':user['projectname']}, this.httpOptions)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  allProjectGoals(project_id) {
    return this._http.get<any>(this._scrumProjectUrl + project_id, this.httpOptions);
  }

  updateTask(goal): Observable<any>{
    this.token = localStorage.getItem('token')
    this.logincred = JSON.parse(localStorage.getItem('Authuser'))
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    console.log(this.logincred);
    return this._http.patch<any>(this._taskUpdateUrl + goal.id + '/', {status: goal.status}, {
      headers : new HttpHeaders().set('Authorization', `Basic ${this.logincred}==`)
    });

  }



  createAProject(user: CreateNewProject) {
    return this._http.post<any>(this._url, {'email': user['email'], 'full_name': user['fullname'], 'password':user['password'], 'usertype':user['usertype'], 'projname':user['projectname']}, this.httpOptions);

  }

  changeRole(user: CreateNewProject): Observable<any> {
    this.token = localStorage.getItem('token');
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    return this._http.patch(this._changerole + user['password'] + '/', { 'role': user['usertype'], 'project_id': user['projectname'] }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.logincred}==`)
    });

  }

  createGoal(user: Creategoal){
    this.token = localStorage.getItem('token');
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    return this._http.post(this._taskUpdateUrl, { 'name': user['name'], 'project_id': user['projectid'], 'user': user['roleid'] }, {
      headers: new HttpHeaders().set('Authorization', `Basic ${this.logincred}==`).append('Content-Type', 'application/json')
    });

  }

  createSprint(user): Observable<any> {
    this.logincred = JSON.parse(localStorage.getItem('Authuser'));
    this.logincred = btoa(`${this.logincred.email}:${this.logincred.password}`);
    return this._http.post(this._sprintUrl + "?" + 'goal_project_id=' + user, { 'project_id': user }, {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${this.logincred}==`).append('Content-Type', 'application/json')
    })
  }

}
