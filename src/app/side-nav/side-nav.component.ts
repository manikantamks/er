import { Component, OnInit } from '@angular/core';
import { navbarData } from './nav-Data';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  is_loggedin = false;

  constructor() { }

  ngOnInit(): void {
  }
  collapsed = true;
  navData = navbarData;



}
