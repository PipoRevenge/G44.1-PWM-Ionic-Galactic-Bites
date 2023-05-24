import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetailPopupComponent } from 'src/app/components/product-detail-popup/product-detail-popup.component';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  products: string[] = [];
  categories: string[] = [];
  showProductModal: boolean = false;  

  constructor(private modalController: ModalController, private productService: ProductService) { }

  ngOnInit() {
    this.categories = this.productService.getCategories();
    this.loadProductsByCategory(0);
  }

  async openProductModal(productId: string) {
    const modal = await this.modalController.create({
      component: ProductDetailPopupComponent,
      componentProps: {
        productId: productId
      }
    });
    modal.present();
  }

  loadProductsByCategory(i: number) {
    console.log(this.categories);
    if (this.categories.length > i) this.products = this.productService.getProductsIdByCategory(this.categories[i]);
  }

  show(itemId: string): boolean {
    return !this.productService.isOnPoints(itemId);
  }
}