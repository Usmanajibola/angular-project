import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ChangeroleComponent } from './changerole/changerole.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './auth.guard';
import { CreategoalComponent } from './creategoal/creategoal.component';


const routes: Routes = [
  {path: 'homepage', component: HomepageComponent},
  {path: '', component:HomepageComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'scrumboard/:project_id', component:ScrumboardComponent, canActivate: [AuthGuard]},
  {path:'createproject', component:CreateprojectComponent, canActivate: [AuthGuard]},
  {path:'changerole/:role_id', component: ChangeroleComponent},
  {path: 'chat', component:ChatComponent},
  {path:'creategoal/:user_id', component: CreategoalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
