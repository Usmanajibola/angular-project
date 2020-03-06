import { Component, OnInit } from '@angular/core';
import { Creategoal } from '../scrumuser';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  selector: 'app-creategoal',
  templateUrl: './creategoal.component.html',
  styleUrls: ['./creategoal.component.css']
})
export class CreategoalComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _scrumdataService: ScrumdataService, private _router:Router) { }

  ngOnInit(): void {
  }

  userid = this._route.snapshot.paramMap.get('user_id');
  usercred = JSON.parse(localStorage.getItem('Authobj'));
  role_id = localStorage.getItem('goal');
  creategoal = new Creategoal('m' + this.role_id, this.userid, this.usercred.project_id, '');
  feedback = '';


  onCreateGoalSubmit() {
    this._scrumdataService.createGoal(this.creategoal).subscribe(
      data => {
        console.log('success', data);
        this.feedback = data['message']
        this._router.navigate(['/scrumboard', this.usercred.project_id] );

      },

      error => {
        console.log('error', error);
      }
    )
  }

}
