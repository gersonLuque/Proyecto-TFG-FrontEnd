import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskResponseDto} from '@core/dto/taskResponseDto';
import {environment} from '../../environments/environment.development';
const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  createTask(formData:FormData):Observable<TaskResponseDto>{
    return this.http.post<TaskResponseDto>(`${apiUrl}/tasks`, formData);
  }
}
