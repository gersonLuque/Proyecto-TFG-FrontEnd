import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
import {createUserDto} from '../dto/createUserDto';
import {Course} from '../dto/courseDto';
import {UserResponsedDto} from '../dto/userResponsedDto';
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
}
