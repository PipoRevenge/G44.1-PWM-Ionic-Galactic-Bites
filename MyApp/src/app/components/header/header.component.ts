import { AfterViewInit, Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

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

  constructor(private router: Router, private userService: UserService) {}
    userPic: string = "../../../assets/icons/user.png";
    points: number = 0;

  ngOnInit(): void {
      console.log(this.path);
      if (this.path == '/') this.homeStyle = { color: 'rgb(57, 222, 197)' };
      if (this.path == '/menu') this.menuStyle = { color: 'rgb(57, 222, 197)' };
      if (this.path == '/offers') this.offersStyle = { color: 'rgb(57, 222, 197)' };
        this.checkUser();
    }

    checkUser(): void {
        if (this.userService.user) {
            this.userPic = "../../../assets/profile.jpg";
            this.points = this.userService.getUserPoints();
        } else this.userPic =  "../../../assets/icons/user.png";
    }

    shoppingCart() {
        this.router.navigate(['/shopping-cart']);
    }

    login() {
        this.router.navigate(['/profile']);
    }
}