import { Component, OnInit } from '@angular/core';
import { CreateNewProject } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {

  data = JSON.parse(localStorage.getItem('Authobj'))
  userDetails = JSON.parse(localStorage.getItem('Authuser'))
  createProject = new CreateNewProject(this.data.name, this.userDetails.email, this.userDetails.password, '', '')
  feedback = '';

  constructor(private _scrumdataService: ScrumdataService, private _router: Router) { }

  ngOnInit(): void {
  }

  onCreateProjectSubmit() {
    this._scrumdataService.createAProject(this.createProject).subscribe(
      data => {
        console.log('Success', data);
        this.feedback = data['message'];
        this._router.navigate(['/scrumboard', this.data['project_id']]);
      },

      error => {
        console.log('error', error);
      }
    )
  }
}
