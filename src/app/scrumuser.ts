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
