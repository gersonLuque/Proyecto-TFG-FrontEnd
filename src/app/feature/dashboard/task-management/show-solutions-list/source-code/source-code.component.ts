import {Component, input} from '@angular/core';

@Component({
  selector: 'app-source-code',
  imports: [],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.css'
})
export default class SourceCodeComponent {
  prefix = input.required<string>();
  fileId = input.required<number>();
}
