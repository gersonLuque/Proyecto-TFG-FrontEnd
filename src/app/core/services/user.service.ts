import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
import {createUserDto} from '../dto/createUserDto';
import {Course} from '../dto/courseDto';
import {UserResponsedDto} from '../dto/userResponsedDto';
import {UpdateUserDto} from '@core/dto/updateUserDto';
const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  createUser(user:createUserDto):Observable<UserResponsedDto> {
    return this.http.post<UserResponsedDto>(`${apiUrl}/users`,user);
  }
  getAllUsers():Observable<UserResponsedDto[]>{
    return this.http.get<UserResponsedDto[]>(`${apiUrl}/users`);
  }

  getUserById(id:number):Observable<UserResponsedDto>{
    return this.http.get<UserResponsedDto>(`${apiUrl}/users/${id}`);
  }

  updateUser(user:UpdateUserDto):Observable<UserResponsedDto>{
    return this.http.put<UserResponsedDto>(`${apiUrl}/users`,user)
  }

  deleteUser(id:number):Observable<void>{
    return this.http.delete<void>(`${apiUrl}/users/${id}`);
  }
}
