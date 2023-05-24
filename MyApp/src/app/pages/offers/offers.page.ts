import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, AfterViewInit {

  discounted: number[] = [1, 2, 3, 5, 6, 7, 8];
  pointed: number[] = [1, 2, 3, 4];

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
  }

  ngAfterViewInit(): void {
    this.viewportScroller.scrollToAnchor(this.route.snapshot.fragment);
  }
}