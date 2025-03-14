import {Component, input, OnInit} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {SolutionService} from '@core/services/solution.service';
import {Observable} from 'rxjs';
import {SolutionDto} from '@core/dto/solutionDto';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-source-code',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel
  ],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.css'
})
export default class SourceCodeComponent implements OnInit {
  solutionId = input.required<number>();
  solution$:Observable<SolutionDto>

  constructor(private solutionService: SolutionService) {
  }
  ngOnInit() {
    this.solution$ = this.solutionService.getSolutionById(this.solutionId());
  }

}
