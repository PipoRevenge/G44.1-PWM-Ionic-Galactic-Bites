import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss'],
})
export class BannerCarouselComponent {
  images: string[] = [
    '../../../assets/banner/1.jpg',
    '../../../assets/banner/2.jpg',
    '../../../assets/banner/3.jpg',
    '../../../assets/banner/4.jpg'
  ];
}