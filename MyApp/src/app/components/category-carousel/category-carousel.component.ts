import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent {
  @Input() categories: string[] = ['principales', 'complementos', 'bebidas', 'postres'];
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  // constructor(private swiper: Swiper) {}

  swiperSlideChanged(e: any) {
    // console.log('changed: ', this.categories[this.swiper.activeIndex]);
    this.changed.emit(e);
  }
}