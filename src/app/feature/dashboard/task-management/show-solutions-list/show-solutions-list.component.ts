import {Component, input, OnInit} from '@angular/core';
import {SolutionService} from '@core/services/solution.service';
import {Observable} from 'rxjs';
import {SolutionDto} from '@core/dto/solutionDto';
import {AsyncPipe} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-show-solutions-list',
  imports: [
    AsyncPipe,
    Tooltip,
    RouterLink
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
}
