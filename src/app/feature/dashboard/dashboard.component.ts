import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AddHeaderListComponent} from '../../shared/components/add-header-list/add-header-list.component';
import {Observable, switchMap} from 'rxjs';
import {UserJwtDto} from '@core/dto/userJwtDto';
import {AuthService} from '@core/services/auth.service';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {PopUpComponent} from 'app/shared/components/pop-up/pop-up/pop-up.component';
import {CourseService} from '@core/services/course.service';
import {Course} from '@core/dto/courseDto';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterOutlet,
    AddHeaderListComponent,
    RouterLink,
    HeaderComponent,
    ReactiveFormsModule,
    PopUpComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<UserJwtDto>;
  editCourse: boolean;
  createCourse: boolean;
  courses$: Observable<Course[]>;
  items:MenuItem[];

  constructor(private authService: AuthService, private courseService: CourseService) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.user$;
    this.courses$ = this.authService.user$.pipe(
      switchMap((user) => {
        return this.courseService.getCoursesByUserId(user.userId);
      })
    )

    this.items = [
      {
        label: 'Editar Curso',
        icon: 'bi bi-pencil-square',
        command: () => {
          //lógica para editar el curso
        }
      },
      {
        label: 'Borrar Curso',
        icon: 'bi bi-trash',
        command: () => {
          // Lógica para borrar el curso
        }
      }
    ];
  }
}
