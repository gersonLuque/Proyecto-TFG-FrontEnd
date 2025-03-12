import {Component, Input} from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {saveAs} from 'file-saver';
import {StorageService} from '@core/services/storage.service';

@Component({
  selector: 'app-file-list',
  imports: [],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {
  @Input({required : true}) files:any;
  constructor(private storageService:StorageService) {
  }

  async downloadFile(prefix: string, filename: string) {
    const key = `${prefix}/${filename}`;
    const blob = await lastValueFrom(this.storageService.getFile(key))
    saveAs(blob, filename)
  }
}
