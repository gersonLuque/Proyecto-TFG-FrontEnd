import {Component, input, OnInit} from '@angular/core';
import {SolutionService} from '@core/services/solution.service';
import {Observable} from 'rxjs';
import {SolutionDto} from '@core/dto/solutionDto';
import {AsyncPipe} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {RouterLink} from '@angular/router';
import { StarComponent } from "../../../../shared/components/star/star.component";
import { BcodeComponent } from "../../../../shared/components/button-code/bcode/bcode.component";

@Component({
  selector: 'app-show-solutions-list',
  imports: [
    AsyncPipe,
    Tooltip,
    RouterLink,
    StarComponent,
    BcodeComponent
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
}
