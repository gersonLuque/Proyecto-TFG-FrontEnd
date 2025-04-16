import {Injectable} from '@angular/core';
import {jwtDecode} from "jwt-decode";
import {UserJwtDto} from '../dto/userJwtDto';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getUserFromToken(token: string): UserJwtDto | null {
    const user = jwtDecode<UserJwtDto>(token);
    const expirationDate = new Date(user.exp * 1000);
    if (new Date() > expirationDate) {
      localStorage.removeItem('token');
      return null;
    }
    return user;
  }
}
