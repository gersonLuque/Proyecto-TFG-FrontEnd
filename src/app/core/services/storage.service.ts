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

  getFile(key: string): Observable<Blob> {
    return this.http.get(`${apiUrl}/storage/download?key=${key}`, {
      responseType: 'blob'
    });
  }
}
