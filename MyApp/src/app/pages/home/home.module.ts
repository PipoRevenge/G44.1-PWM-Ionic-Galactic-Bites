import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { SpaceBackgroundModule } from 'src/app/components/space-background/space-background.module';
import { BannerModule } from 'src/app/components/banner/banner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FooterModule,
    SpaceBackgroundModule,
    BannerModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}