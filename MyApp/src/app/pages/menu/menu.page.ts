import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetailPopupComponent } from 'src/app/components/product-detail-popup/product-detail-popup.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  products: number[] = [1, 2, 3, 4, 5]
  showProductModal: boolean = false;  

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openProductModal() {
    const modal = await this.modalController.create({
      component: ProductDetailPopupComponent,
      componentProps: {
        product: { 
          id: '1', 
          image: '../../../assets/placeholder.png',
          name: 'borguesa',
          description: 'borguesa rica',
          price: 12,
          discount: 60,
          category: 'principales',
          hasPoints: false
        }
      }
    });
    modal.present();
  }

  // setProductModal(value: boolean) {
  //   this.showProductModal = value;
  //   console.log(value);
  // }
}