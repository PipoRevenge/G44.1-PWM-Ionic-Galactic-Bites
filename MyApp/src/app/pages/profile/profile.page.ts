import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  logout() {
    this.userService.logout().then(
      (value: void) => this.router.navigate(['/login'])
    )
  }

  getUser() {
    if (!this.userService.user) this.router.navigate(['/login']);
  }
}