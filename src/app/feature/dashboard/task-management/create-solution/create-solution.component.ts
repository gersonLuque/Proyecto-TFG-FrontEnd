import {Component, input, OnInit} from '@angular/core';
import {TaskDto} from '@core/dto/taskDto';
import {CourseService} from '@core/services/course.service';
import {TaskService} from '@core/services/task.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {FileListComponent} from '../../../../shared/components/file-list/file-list.component';

@Component({
  selector: 'app-create-solution',
  imports: [
    AsyncPipe,
    FileListComponent
  ],
  templateUrl: './create-solution.component.html',
  styleUrl: './create-solution.component.css'
})
export default class CreateSolutionComponent  implements OnInit{

  taskId = input.required<number>()
  id = input.required<number>() // courseId
  task$:Observable<TaskDto>;

  constructor(private taskService:TaskService) {

  }
  ngOnInit() {
    this.task$ = this.taskService.getTaskById(this.taskId());
  }

}
