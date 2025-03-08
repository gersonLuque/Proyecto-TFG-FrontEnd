import { Component, input, OnInit} from '@angular/core';
import {AppUploadFilesComponent} from '../../../../shared/components/app-upload-files/app-upload-files.component';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TaskDetailsComponent} from '../../../../shared/components/task-form/task-details/task-details.component';
import {TaskResponseDto} from '@core/dto/taskResponseDto';
import {TaskService} from '@core/services/task.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-task',
  imports: [
    AppUploadFilesComponent,
    FormsModule,
    ProgressSpinner,
    TaskDetailsComponent
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export default class EditTaskComponent implements OnInit {

  taskId = input.required<number>();
  isLoading: boolean = false;
  editTaskForm: FormGroup
  taskDto$: Observable<TaskResponseDto>
  taskSub: Subscription
  task:TaskResponseDto

  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.editTaskForm = this.fb.group({
      title: [''],
      description: [''],
      endDate: [null],
      endTime: [null],
      visible: [false]
    })
  }

  ngOnInit() {
    this.taskDto$ = this.taskService.getTaskById(this.taskId())
    this.taskSub = this.taskDto$.subscribe(
      task => {
        this.task = task
        const endTime = new Date()
        const [hour,min,seg] = task?.endTime.split(':').map(Number)
        endTime.setHours(hour,min,seg);
        this.editTaskForm.patchValue({endDate: new Date(task?.endDate),endTime: endTime})
      })
  }

  sendData() {
    console.log(this.editTaskForm.value)
  }

  handleUploadedFiles(files: any[]) {
    this.uploadedFiles = files
  }

}
