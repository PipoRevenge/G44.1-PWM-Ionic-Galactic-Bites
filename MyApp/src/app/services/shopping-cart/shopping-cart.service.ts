import { Injectable } from '@angular/core';
import { ProductService } from '../product/product.service';
import { FirebaseDataService } from '../database/firebase-data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  private shoppingCartSubject: BehaviorSubject<Map<string, number>> = new BehaviorSubject(new Map<string, number>());
  shoppingCart: Observable<Map<string, number>> = this.shoppingCartSubject.asObservable();
  totalPrice: number = 0;
  totalPoints: number = 0;
  
  constructor(private itemService: ProductService, private firebaseServices: FirebaseDataService) {}

  isShoppingCart(): boolean {
    return (Object(this.shoppingCartSubject.getValue()) && Object.keys(this.shoppingCartSubject.getValue()).length > 0) 
  }

  getQuantity(itemId: string): number | null {
    const shoppingCartMap = this.shoppingCartSubject.getValue()
    return  Object(shoppingCartMap)[itemId];

  }

  deleteItem(itemId: string): void {
    const updatedCart = this.shoppingCartSubject.getValue();
    delete Object(updatedCart)[itemId]
    this.shoppingCartSubject.next(updatedCart);
  }

  addItem(itemId: string): void {
    const updatedCart = this.shoppingCartSubject.getValue();
    let quantity: number = 0;
     
    if (itemId in Object(updatedCart) ) quantity = this.getQuantity(itemId);
    Object(updatedCart)[itemId] = quantity + 1;
    this.shoppingCartSubject.next(updatedCart);
  }

  removeItem(itemId: string): void {
    const updatedCart = this.shoppingCartSubject.getValue();
    let quantity: number = 0;
    if (itemId in Object(updatedCart) ) quantity = this.getQuantity(itemId);
    Object(updatedCart)[itemId] = quantity - 1;
    if (quantity - 1 == 0) this.deleteItem(itemId);
    this.shoppingCartSubject.next(updatedCart);
  }

  getTotalPrice(): number  {
    this.totalPrice = 0;
    if (!this.isShoppingCart()) return this.totalPrice;
    const currentCart = this.shoppingCartSubject.getValue();
    Object.keys(currentCart).forEach(key => {
      if (!this.itemService.isOnPoints(key)) this.totalPrice += this.itemService.getItemPrice(key) * Object(currentCart)[key];
    });

    return parseFloat(this.totalPrice.toFixed(2));
  }

  getItemsKeys(): string[] {
    return Object.keys(this.shoppingCartSubject.getValue());
  }
  
  setData(map: Map<string, number>): Promise<void> {
    return new Promise((resolve) => {
      console.log('setting up shopping cart data...');
      if (!map) {
        map = new Map<string, number>();
      }
      this.shoppingCartSubject.next(map);
      resolve();
    });
  }
  getTotalPoints(): number {
    this.totalPoints = 0;
    if (!this.isShoppingCart()) return this.totalPrice;
    const currentCart = this.shoppingCartSubject.getValue();
    Object.keys(currentCart).forEach(key => {
        this.totalPoints  += this.itemService.getPointsCost(key) * Object(currentCart)[key];
    });
    return parseFloat(this.totalPoints.toFixed(2));
  }
  getPoints() {
    let points = parseInt(this.getTotalPrice().toFixed(0))*10 
    let pointslost = this.getTotalPoints();
    return points-pointslost
  }
  clear() {
    let updatedCart = this.shoppingCartSubject.getValue();
    Object.keys(updatedCart).forEach(key => {
         delete Object(updatedCart)[key];
    });
    this.shoppingCartSubject.next(updatedCart);
  }
}