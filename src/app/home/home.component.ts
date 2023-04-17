import { Component, OnInit } from '@angular/core';
import { Query } from '../recommended/recommended.component';
import { QueriesService } from '../service/queries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  all_queries : Query[] = [];

  constructor(private queryservice : QueriesService) { }

  ngOnInit(): void {
    this.queryservice.get_all_queries().subscribe(
      response => {
      this.all_queries = response;
    })
  }

}
