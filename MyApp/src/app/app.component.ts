import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { FirebaseDataService } from './services/database/firebase-data.service';
import { ProductService } from './services/product/product.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private firebaseDataService: FirebaseDataService, private productservices: ProductService) {
  }

  ngOnInit(): void {
    this.setUp();
  }
  setUp() {
    this.productservices.setUp();
  }
}