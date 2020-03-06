import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrumdataService } from '../scrumdata.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.css']
})
export class ScrumboardComponent implements OnInit {


  constructor(private _route: ActivatedRoute, private _scrumdataService: ScrumdataService, private _router: Router) { }

  public tftw: any[] = [];
  public tftd: any[] = [];
  public verify: any[] = [];
  public done: any[] = [];

  feedback = '';
  projdet :any;
  theuser = JSON.parse(localStorage.getItem('Authobj'));
  username=this.theuser.name;
  role = String(this.theuser.role);
  rolee=this.theuser.role_id;
  project_id = 0
  goal_id = 0
  status = ''
  roleid = 0
  theparticipants = JSON.parse(localStorage.getItem('participants'))
  _participants = this.theparticipants;

  yourname = this.theuser.name;

  ngOnInit(): void {

    this.project_id = parseInt((this._route.snapshot.paramMap.get('project_id')));
    this.getProjectGoals();
    console.log(this._participants)






  }

  determineRole(val) {


    if (val == 'cdk-drop-list-3') {
      return 3;
    }
    else if (val == 'cdk-drop-list-2') {
      return 2;
    }
    else if (val == 'cdk-drop-list-1') {
      return 1;
    }
    else if (val == 'cdk-drop-list-0') {
      return 0;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex



      );
      let goal = event.item.data;

      console.log(goal.status);
      let status = this.determineRole(event.container.id);
      this._scrumdataService.updateTask(goal).subscribe(
        data => {console.log('success', data)},

        error => {console.error('error'), error}
      )



    }






  }


  getProjectGoals() {
    this._scrumdataService.allProjectGoals(this.project_id).subscribe(
      data => {console.log(data),
        console.log(data['data'])
        localStorage.setItem('participants', JSON.stringify(data['data']));



        /*for (let participant of this.participants) {
          for (let goal of participant['scrumgoal_set']){
            if (goal['status'] == 0 && goal['user'] == participant['id']) {
              this.tftw.push([goal['id'], goal['name']]);
            }
            else if (goal['status'] == 1 && goal['user'] == participant['id']) {
              this.tftd.push([goal['id'], goal['name']]);
            }
            else if (goal['status'] == 2 && goal['user'] == participant['id']) {
              this.verify.push([goal['id'], goal['name']]);
            }
            else if (goal['status'] == 3 && goal['user'] == participant['id'])
            {
              this.done.push([goal['id'], goal['name']]);
            }
            else{
              break;
            }
          }

        }*/
      },
      error => {console.error('Error', error)}


    )

  }

  onClick(tftw) {
    let user = tftw['user']['id']
    localStorage.setItem('goal', JSON.stringify(tftw["id"]));
    this._router.navigate(['/creategoal/', user])
  }

  onClickrole(participant) {
    this._router.navigate(['/changerole/', participant["id"]]);
  }

  startSprint() {
    this.projdet = JSON.parse(localStorage.getItem('Authobj'));
    this._scrumdataService.createSprint(this.projdet.project_id).subscribe(
      data => {
        this.feedback = "sprint just started"
        console.log("successfull: sprint : " + data["message"])
      },
      error => {
        console.log('sprint error', JSON.stringify(error));
        this.feedback = "Sprint Started";
      }
    )
  }

  /*sortGoalSet() {
    for (let participant of this.participants) {
      for (let goal of participant['scrumgoal_set']){
        if (goal['status'] == 0 && goal['user'] == participant['id']) {
          this.tftw.push(goal['name']);
        }
        else if (goal['status'] == 1 && goal['user'] == participant['id']) {
          this.tftd.push(goal['name']);
        }
        else if (goal['status'] == 2 && goal['user'] == participant['id']) {
          this.verify.push(goal['name']);
        }
        else if (goal['status'] == 3 && goal['user'] == participant['id'])
        {
          this.done.push(goal['name']);
        }
        else{
          break;
        }
      }
        console.log(this.participants)
    }

  }*/






}
