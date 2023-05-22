import { Component, Input, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { FirebaseDataService } from 'src/app/services/database/firebase-data.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent  implements OnInit {
  q:Observable<number>

  @Input() item: Product | null = null;
  imageUrl: Observable<string>;

  constructor(private shoppingCartService:ShoppingCartService,private prdoductService:ProductService ,private firebaseservices:FirebaseDataService) {}

  ngOnInit() {
    this.imageUrl = from(this.firebaseservices.getImage(this.item.image));
    // this.q = of(this.shoppingCartService.getQuantity(this.item.id)) ;
    // console.log(this.q);
  }
  
  getPrice(): number | null {
    if (!this.item) return null;
    return parseFloat(this.prdoductService.getItemPrice(this.item.id).toFixed(2));
  }

  getQuantity(): number {
    return this.shoppingCartService.getQuantity(this.item.id);
  }

  showPoints(): boolean {
    return this.prdoductService.isOnPoints(this.item.id);
  }

  getPoints(): number {
    return this.prdoductService.getPointsCost(this.item.id);
  }

  delete() {
    if (!this.item) return;
    this.shoppingCartService.deleteItem(this.item.id);
  }

  add() {
    if (!this.item) return;
    this.shoppingCartService.addItem(this.item.id);
  }

  remove() {
    if (!this.item) return;
    this.shoppingCartService.removeItem(this.item.id);
  }
  
}