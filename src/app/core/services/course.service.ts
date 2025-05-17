import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../dto/courseDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {TaskDto} from '@core/dto/taskDto';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${apiUrl}/courses`);
  }

  getCoursesByUserId(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${apiUrl}/courses/user/${id}`);
  }

  getTasksByCourseId(courseId: number, userId: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(`${apiUrl}/courses/${courseId}/tasks?userId=${userId}`);
  }

  createCourse (course: Course,userId:number): Observable<Course> {
    return this.http.post<Course>(`${apiUrl}/courses?userId=${userId}`, course);
  }

  editCourse (course: Course): Observable<Course> {
    return this.http.put<Course>(`${apiUrl}/courses`, course);
  }

  deleteCourseById(courseId: number) {
    return this.http.delete<Course>(`${apiUrl}/courses/${courseId}`);
  }
}
