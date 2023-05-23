import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent {
  @Input() categories: string[] = ['complementos', 'principales', 'bebidas', 'postres'];
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  carouselItems: string[] = [];
  position: number = 0;

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
}