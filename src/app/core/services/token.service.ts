import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  public decodeToken(token:string){
    
  }
}
