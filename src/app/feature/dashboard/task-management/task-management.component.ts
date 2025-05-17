import {Component, input, OnInit} from '@angular/core';
import {CourseService} from '@core/services/course.service';
import {lastValueFrom, Observable, tap} from 'rxjs';
import {TaskDto} from '@core/dto/taskDto';
import {AsyncPipe, SlicePipe} from '@angular/common';
import {AddHeaderListComponent} from '../../../shared/components/add-header-list/add-header-list.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ConfirmService} from '@core/services/confirm.service';
import {ToastService} from '@core/services/toast.service';
import {TaskService} from '@core/services/task.service';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {PopUpComponent} from "../../../shared/components/pop-up/pop-up/pop-up.component";
import {MenuItem} from 'primeng/api';
import {UserJwtDto} from '@core/dto/userJwtDto';
import {AuthService} from '@core/services/auth.service';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-task-management',
  imports: [
    AsyncPipe,
    SlicePipe,
    AddHeaderListComponent,
    RouterLink,
    ConfirmDialog,
    PopUpComponent,
    Tooltip
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit {
  id = input.required<number>(); // cursoId

  tasks$: Observable<TaskDto[]>
  menuItems: { [taskId: string]: MenuItem[] } = {};
  user$: Observable<UserJwtDto>;
  userIdCurrent: number;

  constructor(private courseService: CourseService,
              private confirmService: ConfirmService,
              private taskService: TaskService,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userIdCurrent = user.userId
    })
    this.tasks$ = this.courseService.getTasksByCourseId(this.id(), this.userIdCurrent).pipe(
      tap(tasks => {
        this.menuItems = {}; // Limpiar datos anteriores
        tasks.forEach(task => {
          this.menuItems[task.taskId] = this.getitems(task);
        })
      }))
    console.log(this.authService.user$)
    this.user$ = this.authService.user$;
  }

  showConfirmDelete(task: TaskDto) {
    this.confirmService.showDeleteDialog(`¿Estas seguro de eliminar la tarea ${task.title}?`, async () => {
      await lastValueFrom(this.taskService.deleteTask(task.taskId));
      this.toastService.showSuccess(`Tarea ${task.title} eliminada correctamente`);
      this.tasks$ = this.courseService.getTasksByCourseId(this.id(), this.userIdCurrent)
    });
  }

  getitems(task: TaskDto): MenuItem[] {
    return [
      {
        label: 'Editar Tarea',
        icon: 'bi bi-pencil-square',
        command: () => {
          this.router.navigate(['edit-task', task.taskId], {relativeTo: this.route});
        }
      },
      {
        label: 'Borrar Tarea',
        icon: 'bi bi-trash',
        command: () => {
          this.showConfirmDelete(task);
        }
      }
    ];
  }

  isPastEndDate(endDate: string, endTime: string): boolean {
    const now = new Date();

    const [year, month, day] = endDate.split('-').map(Number);

    const [hours, minutes, seconds] = endTime.split(':').map(Number);

    const endDateTime = new Date(year, month - 1, day, hours, minutes, seconds);

    return now > endDateTime;
  }
}
