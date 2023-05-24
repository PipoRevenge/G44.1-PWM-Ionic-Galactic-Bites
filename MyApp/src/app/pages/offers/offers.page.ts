import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductDetailPopupComponent } from 'src/app/components/product-detail-popup/product-detail-popup.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, AfterViewInit {

  discounted: number[] = [1, 2, 3, 5, 6, 7, 8];
  pointed: number[] = [1, 2, 3, 4];

  constructor(private viewportScroller: ViewportScroller, private route: ActivatedRoute, private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.route.snapshot.fragment);
  }

  ngAfterViewInit(): void {
    this.viewportScroller.scrollToAnchor(this.route.snapshot.fragment);
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
}