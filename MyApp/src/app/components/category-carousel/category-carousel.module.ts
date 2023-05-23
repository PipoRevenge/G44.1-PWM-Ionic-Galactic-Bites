import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CategoryCarouselComponent } from './category-carousel.component';



@NgModule({
  declarations: [CategoryCarouselComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CategoryCarouselComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryCarouselModule { }
