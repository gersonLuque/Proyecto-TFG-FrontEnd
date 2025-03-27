import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AddHeaderListComponent} from '../../shared/components/add-header-list/add-header-list.component';
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
    PopUpComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

//Componente que muestra la lista de cursos
export class DashboardComponent implements OnInit {
  courses: Course[] = []; 

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data; 
      },
      error: (err) => {
        console.error('Error al recuperar cursos:', err); 
      }
    });
  }
}
