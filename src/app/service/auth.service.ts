import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _registerUrl = "http://localhost:3000/api/register";
  // private _loginUrl = "http://localhost:3000/api/login";


  constructor(private http: HttpClient) { }

  store_user(name:string,email : string,skills:Array<string>){
    console.log("in auth service")
    sessionStorage.setItem("Username",name);
    sessionStorage.setItem("UserEmail",email);
    sessionStorage.setItem("UserSkills",JSON.stringify(skills));
    return true;
  }

}
