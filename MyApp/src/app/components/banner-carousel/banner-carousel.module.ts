import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BannerCarouselComponent } from './banner-carousel.component';



@NgModule({
  declarations: [BannerCarouselComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BannerCarouselComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerCarouselModule { }
