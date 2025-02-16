import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Course} from '../dto/courseDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {

  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${apiUrl}/courses`);
  }

}
