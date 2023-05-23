import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoryCarouselComponent } from './category-carousel.component';



@NgModule({
  declarations: [CategoryCarouselComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CategoryCarouselComponent]
})
export class CategoryCarouselModule { }
