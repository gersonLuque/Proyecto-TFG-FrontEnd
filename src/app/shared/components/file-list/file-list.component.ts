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

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'java':
        return 'assets/icons/java.png';
      case 'py':
        return 'assets/icons/py.png';
      case 'sql':
        return 'assets/icons/mysql.png';
      case 'pdf':
        return 'assets/icons/pdf.svg';
      case 'txt':
        return 'assets/icons/txt.png';
      case 'json':
        return 'assets/icons/json.png';
      case 'xml':
        return 'assets/icons/xml.png'; 
      default:
        return 'assets/icons/archivo.png'; // Ruta del ícono por defecto
    }
  }
  


}
