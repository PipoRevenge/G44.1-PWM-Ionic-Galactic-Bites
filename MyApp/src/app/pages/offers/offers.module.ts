import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffersPageRoutingModule } from './offers-routing.module';

import { OffersPage } from './offers.page';
import { SpaceBackgroundModule } from 'src/app/components/space-background/space-background.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { BannerCarouselModule } from 'src/app/components/banner-carousel/banner-carousel.module';
import { ProductModule } from 'src/app/components/product/product.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ProductDetailPopupModule } from 'src/app/components/product-detail-popup/product-detail-popup.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersPageRoutingModule,
    SpaceBackgroundModule,
    FooterModule,
    BannerCarouselModule,
    ProductModule,
    HeaderModule,
    ProductDetailPopupModule,
    SidebarModule
  ],
  declarations: [OffersPage]
})
export class OffersPageModule {}
