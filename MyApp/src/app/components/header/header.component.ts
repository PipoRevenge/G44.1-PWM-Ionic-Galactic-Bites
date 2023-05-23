import { AfterViewInit, Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  home: any = { color: '' };
  menu: any = { color: '' };
  offers: any = { color: '' };
  favs: any = { color: '' };
  cart: any = { color: '' };

  points: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateNav();    
    // this.checkUser();
  }

  private resetNav() {
    this.home = { color: '' };
    this.menu = { color: '' };
    this.offers = { color: '' };
    this.favs = { color: '' };
    this.cart = { color: '' };
  }

  private updateNav() {
    this.router.events.subscribe((event: any) => { 
      this.resetNav();
      let path: string = this.router.url;
      if (event instanceof NavigationEnd) path = event.urlAfterRedirects; 
      if (path == '/') this.home = { color: '#39DE9A' };
      else if (path == '/menu') this.menu = { color: '#39DE9A' };
      else if (path == '/offers' || path == '/offers#points' || path == '/offers#discount') this.offers = { color: '#39DE9A' };
      else if (path == '/favs') this.favs = { color: '#39DE9A' };
      else if (path == '/shopping-cart') this.cart = { color: '#39DE9A' };

    });
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
    this.updateNav();
  }

  // checkUser(): void {
  //     if (this.userService.user) {
  //         this.userPic = "../../../assets/profile.jpg";
  //         this.points = this.userService.getUserPoints();
  //     } else this.userPic =  "../../../assets/icons/user.png";
  // }
}