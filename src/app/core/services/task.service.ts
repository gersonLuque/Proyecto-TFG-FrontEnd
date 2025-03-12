import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskDto} from '@core/dto/taskDto';
import {environment} from '../../environments/environment.development';
const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  createTask(formData:FormData):Observable<TaskDto>{
    return this.http.post<TaskDto>(`${apiUrl}/tasks`, formData);
  }

  getTaskById(taskId:number):Observable<TaskDto>{
    return this.http.get<TaskDto>(`${apiUrl}/tasks/${taskId}`)
  }

  editTask(taskUpdated:FormData):Observable<TaskDto> {
    return this.http.put<TaskDto>(`${apiUrl}/tasks`,taskUpdated)
  }

  deleteTask(taskId:number):Observable<void>{
    return this.http.delete<void>(`${apiUrl}/tasks/${taskId}`)
  }
}
