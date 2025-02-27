import {Component, input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileRemoveEvent, FileSelectEvent, FileUpload, FileUploadEvent} from 'primeng/fileupload';
import {TaskService} from '@core/services/task.service';
import {lastValueFrom} from 'rxjs';


@Component({
  selector: 'app-create-task',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FileUpload
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  id = input.required<number>()

  protected taskCreateForm:FormGroup;

  uploadedFiles: any[] = [];

  constructor(private fb:FormBuilder,private taskService: TaskService) {

    this.taskCreateForm = this.fb.group({
      title: [''],
      description: [''],
      endDate: [''],
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

    await lastValueFrom(this.taskService.createTask(formData))
    console.log(this.taskCreateForm.value)
    console.log(this.uploadedFiles)
  }

  onUpload(event: FileSelectEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onClear(event: Event){
    this.uploadedFiles = [];
  }

  onRemove($event: FileRemoveEvent) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== $event.file.name)
  }
}
