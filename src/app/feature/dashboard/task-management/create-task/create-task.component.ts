import {Component, input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileRemoveEvent, FileSelectEvent, FileUpload, FileUploadEvent} from 'primeng/fileupload';
import {TaskService} from '@core/services/task.service';
import {lastValueFrom} from 'rxjs';
import {ToastService} from '@core/services/toast.service';
import {Router} from '@angular/router';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Calendar} from 'primeng/calendar';


@Component({
  selector: 'app-create-task',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FileUpload,
    ProgressSpinner,
    Calendar,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  id = input.required<number>()

  protected taskCreateForm:FormGroup;

  uploadedFiles: any[] = [];
  isLoading: Boolean = false;

  constructor(private fb:FormBuilder,private taskService: TaskService,private toastService:ToastService,private router:Router) {

    this.taskCreateForm = this.fb.group({
      title: [''],
      description: [''],
      endDate: [null],
      visible: [false]
    })
  }

  async mostrar(){
    const formData = new FormData();
    formData.append('title', this.taskCreateForm.get('title')?.value);
    formData.append('description', this.taskCreateForm.get('description')?.value);
    formData.append('endDate', this.taskCreateForm.get('endDate')?.value);
    formData.append('visible', this.taskCreateForm.get('visible')?.value ? 'true' : 'false');
    formData.append('courseId',this.id().toString())
    formData.append('teacherId',this.id().toString())

    this.uploadedFiles.forEach(file =>{
      formData.append('files', file);
    })

    try {
      this.isLoading = true;
      await lastValueFrom(this.taskService.createTask(formData))
      this.toastService.showSuccess("La tarea se ha creado correctamente")
      await this.router.navigate([`home/dashboard/task-management/${this.id()}`])
    }catch(err){
      this.toastService.showError("Hubo un error al crear la tarea")
    }
  }

  onUpload(event: FileSelectEvent) {
    const maxSize = 10000000; // 10 MB, el mismo tamaño que maxFileSize
    for(let file of event.files) {
      if (file.size <= maxSize){
        this.uploadedFiles.push(file);
      }
    }
  }

  onClear(event: Event){
    this.uploadedFiles = [];
  }

  onRemove($event: FileRemoveEvent) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== $event.file.name)
  }

  protected readonly String = String;
}
