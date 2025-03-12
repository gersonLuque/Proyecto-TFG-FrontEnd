import {Component, input, OnInit} from '@angular/core';
import {CourseService} from '@core/services/course.service';
import {lastValueFrom, Observable} from 'rxjs';
import {TaskDto} from '@core/dto/taskDto';
import {AsyncPipe, SlicePipe} from '@angular/common';
import {AddHeaderListComponent} from '../../../shared/components/add-header-list/add-header-list.component';
import {RouterLink} from '@angular/router';
import {UserResponsedDto} from '@core/dto/userResponsedDto';
import {ConfirmService} from '@core/services/confirm.service';
import {ToastService} from '@core/services/toast.service';
import {TaskService} from '@core/services/task.service';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-task-management',
  imports: [
    AsyncPipe,
    SlicePipe,
    AddHeaderListComponent,
    RouterLink,
    ConfirmDialog
  ],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent implements OnInit{
  id = input.required<number>(); // cursoId

  tasks$:Observable<TaskDto[]>

  constructor(private courseService:CourseService,
              private confirmService:ConfirmService,
              private taskService:TaskService,
              private toastService:ToastService) { }

  ngOnInit(): void {
    this.tasks$ = this.courseService.getTasksByCourseId(this.id(),1); //  todo cambiar por usuario autenticado
  }

  showConfirmDelete(task:TaskDto){
    this.confirmService.showDeleteDialog(`¿Estas seguro de eliminar la tarea ${task.title}?`,async () => {
      await lastValueFrom(this.taskService.deleteTask(task.taskId));
      this.toastService.showSuccess(`Tarea ${task.title} eliminada correctamente`);
      this.tasks$ = this.courseService.getTasksByCourseId(this.id(),1) // todo
    });
  }
}
