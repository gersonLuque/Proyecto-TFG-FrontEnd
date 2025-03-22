import { Component } from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AddHeaderListComponent} from '../../shared/components/add-header-list/add-header-list.component';
import { PopUpComponent } from 'app/shared/components/pop-up/pop-up/pop-up.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    AddHeaderListComponent,
    RouterLink,
    HeaderComponent,
    PopUpComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
