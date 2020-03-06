export class Scrumuser {
  constructor(
    public email: string,
    public fullname: string,
    public password: string,
    public usertype: string,
    public projectname: string,
  ){}
}


export class ScrumUserLoginData {
  constructor(
    public email: string,
    public password: string,
    public projectname: string,
  ) {}
}

export class CreateNewProject {
  constructor (
    public fullname: string,
    public email: string,
    public password: string,
    public usertype: string,
    public projectname: string
  ) {}
}

export class ChangeRole {
  constructor(
    public roles: string,
  ) {}
}

export class MoveGoal {
  constructor (
    public goalId: string,

  ){}
}

export class LoginCred {
  constructor(
    public email : string,
    public password: string,
  ) {}
}

export class Creategoal {
    constructor(
        public roleid: string,
        public user: string,
        public projectid: string,
        public name: string
    ){

    }
}
