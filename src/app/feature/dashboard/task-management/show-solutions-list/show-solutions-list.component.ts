import {Component, input, OnInit} from '@angular/core';
import {SolutionService} from '@core/services/solution.service';
import {Observable} from 'rxjs';
import {SolutionDto} from '@core/dto/solutionDto';
import {AsyncPipe} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {RouterLink} from '@angular/router';
import { StarComponent } from "../../../../shared/components/star/star.component";
import { BcodeComponent } from "../../../../shared/components/button-code/bcode/bcode.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-solutions-list',
  imports: [
    AsyncPipe,
    Tooltip,
    RouterLink,
    StarComponent,
    BcodeComponent,
    CommonModule
],
  templateUrl: './show-solutions-list.component.html',
  styleUrl: './show-solutions-list.component.css'
})
export class ShowSolutionsListComponent implements OnInit {

  taskId = input.required<number>();

  solutions$:Observable<SolutionDto[]>

  constructor(private solutionService: SolutionService) { }

  ngOnInit() {
    this.solutions$ = this.solutionService.getSolutionsByTaskId(this.taskId());
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
  
  trackBySolutionId(index: number, solution: SolutionDto): number {
  return solution.solutionId; // Esto devuelve el ID de la solución, que es único.
}

trackByFileId(index: number, file: any): string {
  return file.fileId; // Esto devuelve el ID único del archivo.
}

}
