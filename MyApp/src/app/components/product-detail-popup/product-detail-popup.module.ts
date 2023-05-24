import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailPopupComponent } from './product-detail-popup.component';
import { IonicModule } from '@ionic/angular';
import { SpaceBackgroundModule } from '../space-background/space-background.module';

@NgModule({
  declarations: [ProductDetailPopupComponent],
  imports: [
    CommonModule,
    IonicModule,
    SpaceBackgroundModule
  ],
  exports: [ProductDetailPopupComponent]
})
export class ProductDetailPopupModule { }