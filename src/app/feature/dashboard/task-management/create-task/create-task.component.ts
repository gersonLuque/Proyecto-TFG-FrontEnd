import {Component, input} from '@angular/core';

@Component({
  selector: 'app-create-task',
  imports: [],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  id = input.required<number>()


}
