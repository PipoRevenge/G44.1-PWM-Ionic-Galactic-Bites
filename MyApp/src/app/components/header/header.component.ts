import { AfterViewInit, Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  path: string = this.router.url;
  homeStyle: any;
  menuStyle: any;
  offersStyle: any;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.path);
    if (this.path == '/') this.homeStyle = { color: 'rgb(57, 222, 197)' };
    if (this.path == '/menu') this.menuStyle = { color: 'rgb(57, 222, 197)' };
    if (this.path == '/offers') this.offersStyle = { color: 'rgb(57, 222, 197)' };
  }
}