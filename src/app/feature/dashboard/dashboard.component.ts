import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AddHeaderListComponent} from '../../shared/components/add-header-list/add-header-list.component';
import {Observable} from 'rxjs';
import {UserJwtDto} from '@core/dto/userJwtDto';
import {AuthService} from '@core/services/auth.service';
import {AsyncPipe} from '@angular/common';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
    imports: [
        RouterOutlet,
        AddHeaderListComponent,
        RouterLink,
        HeaderComponent,
        Button,
        Dialog,
        ReactiveFormsModule
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  currentUser$:Observable<UserJwtDto>;
  editCourse: boolean;
  createCourse: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.user$;
  }
}
