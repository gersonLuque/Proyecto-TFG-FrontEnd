import {Component, input, OnInit} from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {SolutionService} from '@core/services/solution.service';
import {Observable} from 'rxjs';
import {SolutionDto} from '@core/dto/solutionDto';
import {AsyncPipe} from '@angular/common';
import {HighlightJsDirective} from 'ngx-highlight-js';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-source-code',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    HighlightJsDirective,
    AsyncPipe,
    ProgressSpinner
  ],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.css'
})
export default class SourceCodeComponent implements OnInit {
  solutionId = input.required<number>();
  solution$:Observable<SolutionDto>
  code:string = "import"

  constructor(private solutionService: SolutionService) {}

  ngOnInit() {
    this.solution$ = this.solutionService.getSolutionWithContent(this.solutionId())
  }

  formatCode(code: string): string {
    return code
    .split('\n')
    .map((line, index) => {
      const lineNumber = (index + 1).toString();
      const spaces = " ".repeat(3 - lineNumber.length); // Ajusta los espacios según la longitud del número
      return `${lineNumber}.${spaces}${line}`;
    })
    .join('\n');
  }
}
