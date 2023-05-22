import { AfterViewInit, Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  homeStyle: any = { color: '' };
  menuStyle: any = { color: '' };
  offersStyle: any = { color: '' };

  // userPic: string = "../../../assets/icons/user.png";
  points: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}
  // constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.updateNav();    
    // this.checkUser();
  }

  private resetNav() {
    this.homeStyle = { color: '' };
    this.menuStyle = { color: '' };
    this.offersStyle = { color: '' };
  }

  private updateNav() {
    this.router.events.subscribe((event: any) => { 
      this.resetNav();
      let path: string = this.router.url;
      if (event instanceof NavigationEnd) path = event.urlAfterRedirects; 
      if (path == '/') this.homeStyle = { color: '#39DE9A' };
      else if (path == '/menu') this.menuStyle = { color: '#39DE9A' };
      else if (path == '/offers') this.offersStyle = { color: '#39DE9A' };
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

  // shoppingCart() {
  //     this.router.navigate(['/shopping-cart']);
  // }

  // login() {
  //     this.router.navigate(['/profile']);
  // }
}