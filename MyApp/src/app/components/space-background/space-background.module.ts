import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SpaceBackgroundComponent } from './space-background.component';

@NgModule({
  declarations: [SpaceBackgroundComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SpaceBackgroundComponent]
})
export class SpaceBackgroundModule { }