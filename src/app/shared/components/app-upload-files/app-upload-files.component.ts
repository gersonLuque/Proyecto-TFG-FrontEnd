import {Component, EventEmitter, Output} from '@angular/core';
import {FileRemoveEvent, FileSelectEvent, FileUpload} from 'primeng/fileupload';

@Component({
  selector: 'app-app-upload-files',
  imports: [
    FileUpload
  ],
  templateUrl: './app-upload-files.component.html',
  styleUrl: './app-upload-files.component.css'
})
export class AppUploadFilesComponent {

  @Output() uploadedFilesChange = new EventEmitter<any[]>();

  uploadedFiles: any[] = [];
  readonly maxSize = 10000000; // 10 MB

  onUpload(event: FileSelectEvent) {
    for(let file of event.files) {
      if (file.size <= this.maxSize){
        this.uploadedFiles.push(file);
      }
    }
    this.uploadedFilesChange.emit(this.uploadedFiles)
  }

  onClear(event: Event){
    this.uploadedFiles = [];
    this.uploadedFilesChange.emit(this.uploadedFiles)
  }

  onRemove($event: FileRemoveEvent) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.name !== $event.file.name);
    this.uploadedFilesChange.emit(this.uploadedFiles)
  }
}
