import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {AppUploadFilesComponent} from '../../../../shared/components/app-upload-files/app-upload-files.component';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TaskDetailsComponent} from '../../../../shared/components/task-form/task-details/task-details.component';
import {TaskDto} from '@core/dto/taskDto';
import {TaskService} from '@core/services/task.service';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {Panel} from 'primeng/panel';
import {ToastService} from '@core/services/toast.service';
import {Router} from '@angular/router';
import {FileListComponent} from '../../../../shared/components/file-list/file-list.component';
import {Message} from "primeng/message";


@Component({
  selector: 'app-edit-task',
    imports: [
        AppUploadFilesComponent,
        FormsModule,
        ProgressSpinner,
        TaskDetailsComponent,
        Panel,
        FileListComponent,
        Message
    ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export default class EditTaskComponent implements OnInit, OnDestroy {

  taskId = input.required<number>();
  id = input.required<number>(); // cursoId
  isLoading: boolean = false;
  editTaskForm: FormGroup
  taskDto$: Observable<TaskDto>
  taskSub: Subscription
  task: TaskDto
  isFilesReset: boolean = false // si se da al boton de limpiar ficheros
  filesHasChanged: boolean = false // si los ficheros han sido cambiados por otros
  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private toastService: ToastService,
              private router:Router) {
    this.editTaskForm = this.fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
      endDate: [null,Validators.required],
      endTime: [null,Validators.required],
      visible: [false]
    })
  }

  ngOnInit() {
    this.taskDto$ = this.taskService.getTaskById(this.taskId())
    this.taskSub = this.taskDto$.subscribe(
      task => {
        this.task = task
        const endTime = new Date()
        const [hour, min, seg] = task?.endTime.split(':').map(Number)
        endTime.setHours(hour, min, seg);
        this.editTaskForm.patchValue({
          title: task?.title,
          description: task?.description,
          endDate: new Date(task?.endDate),
          endTime: endTime,
          visible: task?.visible
        })
        console.log(this.editTaskForm.value)
      })
  }

  async sendData() {
    if (this.task?.fileTasks.length === 0 && this.uploadedFiles.length > 0) {
      this.filesHasChanged = true
    }
    const taskData = this.getTaskData();
    if (this.filesHasChanged === true) {
      taskData.append('filesHasChanged', "true")
      this.uploadedFiles.forEach(file => {
        taskData.append('files', file);
      })
    }

    try {
      await lastValueFrom(this.taskService.editTask(taskData))
      this.toastService.showSuccess('La tarea ha sido editada con éxito')
      await this.router.navigate([`home/dashboard/task-management/${this.id()}`])
    } catch (error) {
      this.toastService.showError('Error al editar la tarea')
    }

  }

  getTaskData(): FormData {
    const formData = new FormData();
    formData.append('taskId', this.taskId().toString())
    formData.append('title', this.editTaskForm.get('title')?.value);
    formData.append('description', this.editTaskForm.get('description')?.value);

    const dateString: Date = this.editTaskForm.get('endDate')?.value
    const formattedDate = `${dateString.getFullYear()}-${(dateString.getMonth() + 1).toString().padStart(2, '0')}-${dateString.getDate().toString().padStart(2, '0')}`;
    formData.append('endDate', formattedDate);

    const date = new Date(this.editTaskForm.get('endTime')?.value);
    const time = date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});

    formData.append('endTime', time)

    formData.append('visible', this.editTaskForm.get('visible')?.value ? 'true' : 'false')
    return formData;
  }

  handleUploadedFiles(files: any[]) {
    this.uploadedFiles = files
  }

  resetFiles() {
    this.isFilesReset = true;
    this.filesHasChanged = true;
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }
}
