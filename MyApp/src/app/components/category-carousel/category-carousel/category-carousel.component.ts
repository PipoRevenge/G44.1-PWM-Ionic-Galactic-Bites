import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-carousel',
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss']
})
export class CategoryCarouselComponent implements OnInit {

  @Input() categories: string[] = [];
  @Output() scroll: EventEmitter<string> = new EventEmitter<string>();

  carouselItems: string[] = [];
  position: number = 0;

  constructor() {
    this.carouselItems = this.categories.slice(0, 3);
  }

  ngOnInit(): void {
    this.updateCarouselItems();
  }

  onClick(category: string): void {
    this.scroll.emit(category);
  }

  updateCarouselItems() {
    this.carouselItems = this.categories.slice(this.position, this.position+3);
  }

  moveLeft(): void {
    if (this.position == 0) return;
    this.position -= 1; 
    this.updateCarouselItems();
  }

  moveRight(): void {
    if (this.position == this.categories.length - 3) return;
    this.position += 1;
    this.updateCarouselItems();
  }
}