import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  showe: Observable<boolean>;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private itemService: ProductService) {}

  ngOnInit(): void {
    
  }

  show(): boolean {
    // return this.shoppingCartService.isShoppingCart();
    return false;
  }

  getItemsKeys(): string[] {
    let itemsKeys: string[] = [];
    if (this.shoppingCartService.shoppingCart) itemsKeys = this.shoppingCartService.getItemsKeys(); 
    return itemsKeys;
  }

  getItemById(itemId: string): Product | null {
    let itemsKeys: string[] = this.getItemsKeys();
    if (itemsKeys.includes(itemId)) return this.itemService.getItem(itemId);
    else return null;
  }

  getTotalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  onBuy(): void {
    this.router.navigate(['payment']);
  }

  getTotalPoints(): number {
    return this.shoppingCartService.getTotalPoints();
  }
}