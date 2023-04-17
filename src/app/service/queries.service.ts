import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query } from '../recommended/recommended.component';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  constructor(private http:HttpClient) { }

  retriveAllrecommendedQueries(skills: Array<String>){
    console.log("in service")
    console.log(skills)
    return this.http.post<Query[]>("https://querybox.herokuapp.com/query/recommended",{"skills":skills})
  }
  
  get_all_queries(){
    return this.http.get<Query[]>("https://querybox.herokuapp.com/query/latest");
  }


}
