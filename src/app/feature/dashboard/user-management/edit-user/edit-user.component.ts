import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '@core/services/user.service';
import {lastValueFrom, Observable, pipe, Subscription, tap} from 'rxjs';
import {UserResponsedDto} from '@core/dto/userResponsedDto';
import {AsyncPipe} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Course} from '@core/dto/courseDto';
import {CourseService} from '@core/services/course.service';
import {Message} from "primeng/message";
import {ToastService} from '@core/services/toast.service';

@Component({
  selector: 'app-edit-user',
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        Message
    ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit, OnDestroy {

  id = input.required<number>();

  user$:Observable<UserResponsedDto>;

  courses$:Observable<Course[]>;

  userSub:Subscription

  public editUserForm:FormGroup;

  constructor(private userService:UserService,
              private fb:FormBuilder,
              private courseService:CourseService,
              private toastService:ToastService) {
  }

  ngOnInit() {
    this.editUserForm = this.fb.group({
      completeName: ['',Validators.required],
      courses: this.fb.array([])
    })
    this.user$ = this.userService.getUserById(this.id())
    this.courses$ = this.courseService.getCourses();
    this.loadData();
  }

  private loadData() {
    this.userSub = this.user$.pipe(

      tap(user => {
        if (user) this.editUserForm.patchValue({
          completeName: user.completeName,
        });
        const courseArray = this.editUserForm.get('courses') as FormArray;

        user.courses.forEach(course => {
          const courseGroup = this.fb.group({
            courseId: [course.courseId],
            name: [course.name]
          });
          courseArray.push(courseGroup);
        })
      })
    ).subscribe()
  }



  toggleCourse(course: Course) {
    const ar = this.editUserForm.get('courses') as FormArray;
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
  }

  isCourseSelected(user:UserResponsedDto, courseId: number){
    if (user){
       return user.courses?.some(course => course.courseId === courseId);
    }else
      return false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  async actualizar() {
    const user = this.editUserForm.value;
    user.userId = this.id();
    await lastValueFrom(this.userService.updateUser(user));
    this.toastService.showSuccess(`El usuario ${user?.completeName} se ha editado correctamente`)
  }
}
