import { Injectable } from '@angular/core';
import {LoginRequestDto} from '../dto/loginRequestDto';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {LoginResponseDto} from '../dto/loginResponseDto';
import {TokenService} from './token.service';
import {Router} from '@angular/router';
import {UserJwtDto} from '@core/dto/userJwtDto';
const { apiUrl } = environment;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<UserJwtDto | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$:Observable<Boolean> = this.user$.pipe(map(Boolean));

  constructor(private http: HttpClient,private tokenService: TokenService,private router: Router) {
    this.loadUser()
  }

  public loadUser(){
    const token = localStorage.getItem('token');
    if(token){
      this.user.next(this.tokenService.getUserFromToken(token));
    }
}

  public login(loginRequest: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${apiUrl}/auth/login`, loginRequest).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
        this.user.next(this.tokenService.getUserFromToken(response.token));
        this.router.navigate(['home/dashboard']);
      })
    );
  }

  public logout(){
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['auth/login']);
  }
}
