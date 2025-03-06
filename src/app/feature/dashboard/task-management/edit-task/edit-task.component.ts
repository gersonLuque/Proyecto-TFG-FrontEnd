import {Component, input, OnInit} from '@angular/core';
import CreateTaskComponent from '../create-task/create-task.component';
import {AppUploadFilesComponent} from '../../../../shared/components/app-upload-files/app-upload-files.component';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TaskDetailsComponent} from '../../../../shared/components/task-form/task-details/task-details.component';
import {TaskResponseDto} from '@core/dto/taskResponseDto';
import {TaskService} from '@core/services/task.service';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-edit-task',
  imports: [
    AppUploadFilesComponent,
    FormsModule,
    ProgressSpinner,
    TaskDetailsComponent,
    AsyncPipe
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export default class EditTaskComponent implements OnInit{

  taskId = input.required<number>();
  isLoading:boolean  = false;
  editTaskForm:FormGroup
  taskDto$:Observable<TaskResponseDto>
  taskSub:Subscription

  uploadedFiles: any[] = [];

  constructor(private fb:FormBuilder,private taskService:TaskService) {

  }

  ngOnInit() {

    this.taskDto$ = this.taskService.getTaskById(this.taskId())

    let date
    this.taskSub = this.taskDto$.subscribe(
      task => {
        const date = new Date(task?.endDate)
        this.editTaskForm = this.fb.group({
          title: [''],
          description: [''],
          endDate: [date],
          endTime: [null],
          visible: [false]
        })
      })

    console.log(date)


  }

  sendData(){
    console.log(this.editTaskForm.value)
  }

  handleUploadedFiles(files:any[]) {
    this.uploadedFiles = files
  }

}
