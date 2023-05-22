import { AfterViewInit, Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  path: string = this.router.url;
  homeStyle: any;
  menuStyle: any;
  offersStyle: any;

  userPic: string = "../../../assets/icons/user.png";
  points: number = 0;

  constructor(private router: Router) {}
  // constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.path);
    if (this.path == '/') this.homeStyle = { color: '#39DE9A' };
    if (this.path == '/menu') this.menuStyle = { color: '#39DE9A' };
    if (this.path == '/offers') this.offersStyle = { color: '#39DE9A' };
    // this.checkUser();
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