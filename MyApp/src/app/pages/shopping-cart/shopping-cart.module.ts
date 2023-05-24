import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingCartPageRoutingModule } from './shopping-cart-routing.module';

import { ShoppingCartPage } from './shopping-cart.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { SpaceBackgroundModule } from 'src/app/components/space-background/space-background.module';
import { CartItemComponent } from 'src/app/components/cart-item/cart-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingCartPageRoutingModule,
    HeaderModule,
    SidebarModule,
    FooterModule,
    SpaceBackgroundModule
  ],
  declarations: [ShoppingCartPage, CartItemComponent]
})
export class ShoppingCartPageModule {}
