import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  getBodyClass():string{
    return 'body-trimmed';
  }

}
