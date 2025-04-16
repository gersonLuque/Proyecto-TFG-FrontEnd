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
import { CommonModule } from '@angular/common';
import { PopUpComponent } from 'app/shared/components/pop-up/pop-up/pop-up.component';
import { CourseService } from '@core/services/course.service';
import { Course } from '@core/dto/courseDto';

@Component({
    selector: 'app-dashboard',
    imports: [
        CommonModule,
        RouterOutlet,
        AddHeaderListComponent,
        RouterLink,
        HeaderComponent,
        Button,
        Dialog,
        ReactiveFormsModule,
        PopUpComponent
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUser$:Observable<UserJwtDto>;
  editCourse: boolean;
  createCourse: boolean;
  courses$: Observable<Course[]>;
  
  constructor(private authService: AuthService,private courseService: CourseService) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.user$;
    this.courses$ = this.courseService.getCoursesByUserId(1); 
  }
}
