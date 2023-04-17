import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { QueriesService } from '../service/queries.service';


export class Query{
  constructor(
    public id:String,
    public title : String,
    public description: String,
    public tags : Array<string>,
    public posted_by : String,
    public priority : String,
    public posted_on : String,
    public status : String,
    public similarity_score : Float32Array){}
}

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss']
})
export class RecommendedComponent implements OnInit {
  rec_queries : Query[] = []
  user_skills : Array<string> = [];


  constructor( private queryservice : QueriesService) {
    if (!!sessionStorage.getItem("UserSkills")){
      this.user_skills  =  JSON.parse(sessionStorage.getItem("UserSkills") || '{}');
    }
    }
      

  ngOnInit(): void {
    console.log("Recommended page")
    this.queryservice.retriveAllrecommendedQueries(this.user_skills).subscribe(
      response => {
        console.log("Recommended result")
        console.log(response)
        this.rec_queries = response;
      }
    )
  }
  



}
