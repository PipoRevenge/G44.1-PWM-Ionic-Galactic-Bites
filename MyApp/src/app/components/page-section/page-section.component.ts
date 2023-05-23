import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss']
})
export class PageSectionComponent {

  @Input() name: string = '';
  @Input() reverse: boolean = false;
  @Input() img: string = '';
  @Input() fragment: string = '';

  constructor(private router: Router) {}

  navigateToPageAnchor() {
    this.router.navigate(['/offers'], { fragment: this.fragment });
  }  
}