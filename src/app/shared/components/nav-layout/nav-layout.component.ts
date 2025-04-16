import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer/footer.component';

@Component({
  selector: 'app-nav-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './nav-layout.component.html',
  styleUrl: './nav-layout.component.css'
})
export class NavLayoutComponent {
  

}
