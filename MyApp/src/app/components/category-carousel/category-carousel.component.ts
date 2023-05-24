import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent {
  @Input() categories: string[] = [];
  @Output() changed: EventEmitter<number> = new EventEmitter<number>();
  index: number = 0;

  swiperSlideChanged(e: any) {
    if (e.activeIndex && this.index != e.activeIndex) {
      console.log('changed: ', e.activeIndex);
      this.changed.emit(e.activeIndex);
      this.index = e.activeIndex;
    }
  }
}