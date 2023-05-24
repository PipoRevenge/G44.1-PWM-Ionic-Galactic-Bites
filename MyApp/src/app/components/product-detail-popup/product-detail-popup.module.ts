import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailPopupComponent } from './product-detail-popup.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProductDetailPopupComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ProductDetailPopupComponent]
})
export class ProductDetailPopupModule { }