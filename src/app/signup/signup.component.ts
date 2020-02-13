import { Component, OnInit } from '@angular/core';
import {Scrumuser} from '../scrumuser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  usertype = ['developer', 'owner'];
  scrumUserModel = new Scrumuser('johndoe@linuxjobber.com', '', '', '');
}
