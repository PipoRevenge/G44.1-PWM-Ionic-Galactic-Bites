import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  products: number[] = [1, 2, 3, 4, 5]

  constructor() { }

  ngOnInit() {
  }

}
