import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddHeaderListComponent } from '../../shared/components/add-header-list/add-header-list.component';
import { PopUpComponent } from 'app/shared/components/pop-up/pop-up/pop-up.component';
import { CourseService } from '@core/services/course.service';
import { Course } from '@core/dto/courseDto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AddHeaderListComponent,
    RouterLink,
    HeaderComponent,
    PopUpComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    courses$: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
// Assign the observable directly
        this.courses$ = this.courseService.getCoursesByUserId(1); // Assign the observable directly
  }
}
