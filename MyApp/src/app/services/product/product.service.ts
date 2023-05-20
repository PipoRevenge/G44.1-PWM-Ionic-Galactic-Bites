import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FirebaseDataService } from '../database/firebase-data.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mapProducts: Map<string, Product> = new Map<string, Product>();
  private mapCategory: Map<string, string[]> = new Map<string, string[]>();

  constructor(private firebaseDataService: FirebaseDataService){}

  async setUp() {
    await this.firebaseDataService.getAllProducts()
      .then((lista) => {
      lista.forEach((product) => {
        const categoria = product.category;
        if (this.mapCategory.has(categoria)) this.mapCategory.get(categoria)?.push(product.id);
        else this.mapCategory.set(categoria, [product.id]);
        this.mapProducts.set(product.id, product);
      })
    })
  }

  getURL(itemId: string): Observable<string> {
    return from(this.firebaseDataService.getImage(this.getItem(itemId).image));
  } 

  getCategories(): string[] {
    return Array.from(this.mapCategory.keys());
  }

  getProductsIdByCategory(category: string): string[] {
    return this.mapCategory.get(category);
  }

  getProductsId(): string[] {
    return Object.keys(this.mapProducts);
  }

  getProductsOnDiscount(): string[] {
    let discounted: string[] = [];

    this.mapProducts.forEach((value: Product, key: string) => {
      if (this.isOnDiscount(key)) discounted.push(key);
    })

    return discounted;
  }

  getProductsOnPoints(): string[] {
    let points: string[] = [];

    this.mapProducts.forEach((value: Product, key: string) => {
      if (this.isOnPoints(key)) points.push(key);
    })

    return points;
  }
  
  getPointsCost(itemId: string) {
    let product: Product = this.getItem(itemId);
    if (product.hasPoints) {
      return parseInt(product.price.toFixed(0)) * 100;
    }
    return 0;
  }

  isOnDiscount(itemId: string): boolean {
    return this.getItem(itemId).discount > 0;
  }

  isOnPoints(itemId: string): boolean {
    return this.getItem(itemId).hasPoints;
  }

  getItemPrice(itemId: string): number {
    let product: Product = this.getItem(itemId);
    if (!product) return 0;
    return parseFloat((product.price - (product.price * (product.discount/100))).toFixed(2));
  }

  getItem(id: string) {
    return this.mapProducts.get(id);
  }
}