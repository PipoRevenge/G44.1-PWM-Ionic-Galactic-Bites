import { AfterViewInit, Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  favs: any = { color: '' };
  cart: any = { color: '' };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateNav();    
    // this.checkUser();
  }

  private resetNav() {
    this.favs = { color: '' };
    this.cart = { color: '' };
  }

  private updateNav() {
    this.router.events.subscribe((event: any) => { 
      this.resetNav();
      let path: string = this.router.url;
      if (event instanceof NavigationEnd) path = event.urlAfterRedirects; 
      if (path == '/favs') this.favs = { color: '#39DE9A' };
      else if (path == '/shopping-cart') this.cart = { color: '#39DE9A' };
    });
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  // checkUser(): void {
  //     if (this.userService.user) {
  //         this.userPic = "../../../assets/profile.jpg";
  //         this.points = this.userService.getUserPoints();
  //     } else this.userPic =  "../../../assets/icons/user.png";
  // }
}