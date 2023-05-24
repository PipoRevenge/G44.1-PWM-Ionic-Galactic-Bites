import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {

  home: any = { color: '' };
  menu: any = { color: '' };
  offers: any = { color: '' };

  constructor(private router: Router, private menuController: MenuController) {}

  ngOnInit(): void {
    this.updateNav();    
  }

  private resetNav() {
    this.home = { color: '' };
    this.menu = { color: '' };
    this.offers = { color: '' };
  }

  private updateNav() {
    this.router.events.subscribe((event: any) => { 
      this.resetNav();
      let path: string = this.router.url;
      if (event instanceof NavigationEnd) path = event.urlAfterRedirects; 
      if (path == '/') this.home = { color: '#39DE9A' };
      else if (path == '/menu') this.menu = { color: '#39DE9A' };
      else if (path == '/offers' || path == '/offers#points' || path == '/offers#discount') this.offers = { color: '#39DE9A' };
      this.menuController.close();
    });
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
