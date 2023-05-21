import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() productId: string = '';
  @Output() details: EventEmitter<Product> = new EventEmitter<Product>();

  image: string = '../../assets/placeholder.png';
  product: Product | null = null;
  discount: number = 0;
  points: number = 0;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.product = this.productService.getItem(this.productId);
    this.setUrl();
    this.points = this.productService.getPointsCost(this.productId);
  }

  private setUrl() {
    this.productService.getURL(this.productId).subscribe({
      next: (url: string) => this.image = url,
      error: (error: any) => console.error('error getting url:', error)
    });
  }

  onDetails() {
    if (!this.product) return;
    this.details.emit(this.product);
  }

  showDiscount(): boolean {
    return this.productService.isOnDiscount(this.productId);
  }

  showPoints(): boolean {
    return this.productService.isOnPoints(this.productId);
  }
}