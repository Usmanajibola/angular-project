import { Component, OnInit } from '@angular/core';
//import { ScrumUserLoginData } from '../scrumuser';
import { ScrumdataService } from '../scrumdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  scrumUserLogin = {'email':'', 'password':'', 'projectname':''};


  constructor(private _scrumdataService: ScrumdataService, private _router:Router) { }

  ngOnInit(): void {
  }
  feedback = '';


  onLoginSubmit() {
    console.log(this.scrumUserLogin);
    this._scrumdataService.login(this.scrumUserLogin).subscribe(


      data => {
        console.log('Success', data),
        //this.feedback = 'Login successful',
        localStorage.setItem('Authuser', JSON.stringify(this.scrumUserLogin));
        localStorage.setItem('Authobj', JSON.stringify(data));
        localStorage.setItem('token', data.token)

        this._router.navigate(['/scrumboard', data['project_id']])
      },

      error => {
        console.log('Error', error)
        this.feedback = 'Invalid credentials'
      }


  )

}
}
