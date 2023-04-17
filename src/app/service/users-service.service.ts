import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rec_user } from '../postquery/postquery.component';
import { User } from '../postquery/postquery.component';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http:HttpClient) { }

  get_recommended_experts(tags : Array<string>){
    console.log("In User service")
    console.log(tags)
    // return this.http.post<Rec_user[]>("https://querybox.herokuapp.com/user/find_experts",{"tags":tags});
    return this.http.post<Rec_user[]>("http://127.0.0.1:8000/user/find_experts",{"tags":tags});
  }

  get_all_users(){
    console.log("in user service");
    return this.http.get<User[]>("https://querybox.herokuapp.com/user/all");
  }
}
