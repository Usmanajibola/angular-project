import { Component, OnInit } from '@angular/core';
import {Userlogin} from '../userlogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  userLoginModel = new Userlogin('', '', '');
}
