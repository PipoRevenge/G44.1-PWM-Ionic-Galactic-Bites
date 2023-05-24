import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductComponent } from './product.component';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
