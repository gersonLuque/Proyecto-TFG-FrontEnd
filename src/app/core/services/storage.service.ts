import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {Observable} from 'rxjs';
const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http:HttpClient) { }

  // es importante codificar la url para que soporte caracteres especiales
  getFile(key: string): Observable<Blob> {
    const encodedKey = encodeURIComponent(key);
    return this.http.get(`${apiUrl}/storage/download?key=${encodedKey}`, {
      responseType: 'blob'
    });
  }
}
