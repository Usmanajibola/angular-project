import { Component, OnInit } from '@angular/core';
import { ChangeRole, CreateNewProject } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-changerole',
  templateUrl: './changerole.component.html',
  styleUrls: ['./changerole.component.css']
})
export class ChangeroleComponent implements OnInit {



  constructor(private _scrumdataService: ScrumdataService, private _router:ActivatedRoute) { }

  ngOnInit(): void {


  }


  roles = ['Developer', 'Owner', 'Admin', 'QA'];
  roleid = this._router.snapshot.paramMap.get('role_id');
  logincred = JSON.parse(localStorage.getItem('Authobj'));
  role = this.logincred.role;
  project_id = this.logincred.project_id;
  logindet = JSON.parse(localStorage.getItem('Authuser'))
  changeRole = new CreateNewProject('', '', this.roleid, '', this.project_id);
  feedback = '';

  changeTheRole() {
    this._scrumdataService.changeRole(this.changeRole).subscribe(

      data => {
        console.log(this.changeRole);
        console.log('success', data);
        this.feedback = 'Your role has been changed to' + data['role'];

      },

      error => {
        console.error('Error', error)
      }
    )
  }

}
