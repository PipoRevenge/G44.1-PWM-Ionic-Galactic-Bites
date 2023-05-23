import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent {
  @Input() categories: string[] = ['complementos', 'principales', 'bebidas', 'postres'];
  @Output() changed: EventEmitter<string> = new EventEmitter<string>();

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
    this.changed.emit(e);
  }
}