import { Injectable } from '@angular/core';
import {LoginRequestDto} from '../dto/LoginRequestDto';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {LoginResponseDto} from '../dto/LoginResponseDto';
import {TokenService} from './token.service';
const { apiUrl } = environment;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${apiUrl}/auth/login`, loginRequest).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
      }));
  }
}
