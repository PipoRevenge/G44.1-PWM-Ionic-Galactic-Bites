import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { FirebaseDataService } from './services/database/firebase-data.service';
import { ProductService } from './services/product/product.service';
import { SqliteDataService } from './services/database/sqlite-data.service';
import { Platform } from '@ionic/angular';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private firebaseDataService: FirebaseDataService, private productservices: ProductService, private sqliteDataService: SqliteDataService,private platform: Platform) {
    
  }

  ngOnInit(): void {
    this.setUp();
  }
  
  async setUp() {
  
  }
  async initializeApp() {
    await this.productservices.setUp()
    this.platform.ready().then(() => {
      this.sqliteDataService.initDatabase();
    });
  }
}