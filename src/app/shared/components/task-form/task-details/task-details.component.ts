import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Calendar} from 'primeng/calendar';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-task-details',
  imports: [
    ReactiveFormsModule,
    DatePicker
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  @Input({required:true}) formData!: FormGroup
  @Input() title:string = ''
  @Input() description:string = ''
  @Input() visible:boolean = false
}
