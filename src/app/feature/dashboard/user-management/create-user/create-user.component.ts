import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Course} from '@core/dto/courseDto';
import {CourseService} from '@core/services/course.service';
import {AsyncPipe} from '@angular/common';
import {firstValueFrom, Observable} from 'rxjs';
import {Toast, ToastModule} from 'primeng/toast';
import {createUserDto} from '@core/dto/createUserDto';
import {ToastService} from '@core/services/toast.service';
import {UserService} from '@core/services/user.service';


@Component({
  selector: 'app-create-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    Toast,
    ToastModule
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {

  courses$: Observable<Course[]>;

  public createUserForm: FormGroup;

  constructor(private fb: FormBuilder,
              protected courseService: CourseService,
              private userService: UserService,
              private toastService: ToastService) {

    this.createUserForm = this.fb.group({
      username: [''],
      completeName: [''],
      password: [''],
      rol: [''],
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

  async submit() {
    const user: createUserDto = this.createUserForm.value;
    await firstValueFrom(this.userService.createUser(user))
    .then(() => {
      this.toastService.showSuccess(`Usuario ${user.username} creado con éxito`);
    })
    .catch(error => {
      const errorMessage = (typeof error?.error === 'string') ? error.error : '';
      this.toastService.showError(`Error al crear el usuario ${user.username} \n ${errorMessage}`);
    });
  }
}
