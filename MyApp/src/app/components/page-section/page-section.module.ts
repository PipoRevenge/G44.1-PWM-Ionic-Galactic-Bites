import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PageSectionComponent } from './page-section.component';

@NgModule({
  declarations: [PageSectionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [PageSectionComponent]
})
export class PageSectionModule { }
