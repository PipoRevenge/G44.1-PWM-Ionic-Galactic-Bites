import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FirebaseDataService } from '../database/firebase-data.service';
import { ProductService } from '../product/product.service';
import { SqliteDataService } from '../database/sqlite-data.service';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class FavProductsService {
  
  private FavProductsSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  FavProducts$: Observable<string[]> = this.FavProductsSubject.asObservable();

  constructor(private itemService: ProductService, private productService:ProductService, private sqliteDataServices:SqliteDataService) {  }

  deleteItem(itemId: string): void {
    const currentValue = this.FavProductsSubject.getValue();
    const index = currentValue.indexOf(itemId);
    if (index > -1) {
      currentValue.splice(index, 1);
      this.sqliteDataServices.removeFavProduct(this.productService.getItem(itemId));
      this.FavProductsSubject.next([...currentValue]);
    }
  }

  addItem(itemId: string): void {
    const currentValue = this.FavProductsSubject.getValue();
    if (!currentValue.includes(itemId)) {
      currentValue.push(itemId);
      this.sqliteDataServices.addFavProduct(this.productService.getItem(itemId));
      this.FavProductsSubject.next([...currentValue]);
    }
  }
  async setAllFavProduct(products: string[]) {
    let currentValue = products;
    currentValue.forEach(async (value) => {
      let mod =  this.productService.getItem(value)
      console.log(mod);

      this.sqliteDataServices.addFavProduct(mod);


    })
    this.FavProductsSubject.next([...currentValue]);
  }
  async getfavProducts(): Promise<Product[]> {
    return await this.sqliteDataServices.getAllFavProducts();
  }
    
  
}

