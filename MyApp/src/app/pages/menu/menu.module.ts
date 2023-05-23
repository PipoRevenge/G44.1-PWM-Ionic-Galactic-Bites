import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { SpaceBackgroundModule } from 'src/app/components/space-background/space-background.module';
import { CategoryCarouselModule } from 'src/app/components/category-carousel/category-carousel.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    FooterModule,
    SpaceBackgroundModule,
    CategoryCarouselModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}