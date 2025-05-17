import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AddHeaderListComponent} from '../../shared/components/add-header-list/add-header-list.component';
import {lastValueFrom, Observable, switchMap, tap} from 'rxjs';
import {UserJwtDto} from '@core/dto/userJwtDto';
import {AuthService} from '@core/services/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {PopUpComponent} from 'app/shared/components/pop-up/pop-up/pop-up.component';
import {CourseService} from '@core/services/course.service';
import {Course} from '@core/dto/courseDto';
import {MenuItem} from 'primeng/api';
import {ConfirmService} from '@core/services/confirm.service';
import {ToastService} from '@core/services/toast.service';
import {Button} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterOutlet,
    AddHeaderListComponent,
    RouterLink,
    HeaderComponent,
    ReactiveFormsModule,
    PopUpComponent,
    FormsModule,
    Button,
    ConfirmDialog,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<UserJwtDto>;
  editCourseDialog: boolean;
  createCourseDialog: boolean;
  courses$: Observable<Course[]>;
  menuItems: { [courseId: string]: MenuItem[] } = {};
  editCourseForm: FormGroup;
  createCourseForm: FormGroup;

  constructor(private authService: AuthService,
              private courseService: CourseService,
              private fb: FormBuilder,
              private confirmService: ConfirmService,
              private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.user$;
    this.updateCoursesList()
    this.editCourseForm = this.fb.group({
      courseId: [''],
      name: [''],
    })
    this.createCourseForm = this.fb.group({
      courseId: [''],
      name: [''],
    })
  }

  getItems(course: Course): MenuItem[] {
    return [
      {
        label: 'Editar curso',
        icon: 'bi bi-pencil-square',
        command: () => {
          this.editCourseDialog = true;
          this.editCourseForm.patchValue({
            courseId: course.courseId,
          })
        }
      },
      {
        label: 'Borrar curso',
        icon: 'bi bi-trash',
        command: () => {
          this.showConfirmDelete(course);
        }
      }
    ];
  }
    activarCreateCourseDialog = () => {
      this.createCourseDialog = true;
    }
    showConfirmDelete(course:Course){
      this.confirmService.showDeleteDialog(`¿Estas seguro de eliminar el curso ${course.name}?`, async () => {
        await lastValueFrom(this.courseService.deleteCourseById(course.courseId));
        this.toastService.showSuccess(`Curso ${course.name} eliminada correctamente`);
        this.updateCoursesList();
      });
    }


    updateCoursesList()
    {
      this.courses$ = this.authService.user$.pipe(
        switchMap((user) => {
          return this.courseService.getCoursesByUserId(user.userId);
        }),
        tap(course => {
          this.menuItems = {}
          course.forEach(course => {
            this.menuItems[course.courseId] = this.getItems(course);
          })
        })
      )
    }

    async createCourse(userId: number)
    {
      const course = this.createCourseForm.value;
      try {
        await lastValueFrom(this.courseService.createCourse(course, userId));
        this.toastService.showSuccess(`Curso ${course.name} creado correctamente`);
        this.createCourseDialog = false;
        this.updateCoursesList();
      } catch (error) {
        this.toastService.showError('Error al crear el curso');
      }
    }
    async editCourse()
    {
      const course = this.editCourseForm.value;
      try {
        await lastValueFrom(this.courseService.editCourse(course));
        this.toastService.showSuccess(`Curso ${course.name} editado correctamente`);
        this.editCourseDialog = false;
        this.updateCoursesList()
      } catch (error) {
        this.toastService.showError('Error al editar el curso');
      }
    }
  }
