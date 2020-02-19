import { Component, OnInit } from '@angular/core';
import {Scrumuser} from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _scrumdataService: ScrumdataService) { }

 feedback = '';

  ngOnInit(): void {
  }
  usertype = ['developer', 'owner'];
  scrumUserModel = new Scrumuser('', '', '', '', '');

  onSubmit() {

    console.log(this.scrumUserModel);
    this._scrumdataService.signup(this.scrumUserModel).subscribe(
      data => {console.log('Success!', data), this.feedback = 'Your account was created successfully'},
      error => {console.error('Error!', error), this.feedback = 'signup failed'}
    )
  }
}
