import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Course} from '../../../../core/dto/courseDto';
import {CourseService} from '../../../../core/services/course.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable, of} from 'rxjs';
import {Toast, ToastModule} from 'primeng/toast';
import {Button} from 'primeng/button';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-create-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    Toast,
    ToastModule,
    Button,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  courses$: Observable<Course[]>;

  public createUserForm: FormGroup;

  constructor(private fb: FormBuilder, protected courseService: CourseService,private messageService: MessageService) {
    this.createUserForm = this.fb.group({
      username: [''],
      completeName: [''],
      password: [''],
      role: [''],
      courses: this.fb.array([])
    })
  }
  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }
  toggleCourse(course: Course) {
    const ar = this.createUserForm.get('courses') as FormArray;
    const existingIndex = ar.controls.findIndex(control =>
      control.get('courseId').value === course.courseId // Asegúrate que coincida con course.courseId
    );

    if (existingIndex !== -1) {
      ar.removeAt(existingIndex);
    } else {
      const newCourse = this.fb.group({
        courseId: [course.courseId],
        name: [course.name]
      });
      ar.push(newCourse);
    }
    // console.log(this.createUserForm.value);
  }

  submit() {
  }

  show() {
    this.messageService.add({severity:'info', summary: 'Exito', detail: 'Usuario creado correctamente'});
  }
}
