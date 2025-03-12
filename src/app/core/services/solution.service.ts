import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SolutionDto} from '@core/dto/solutionDto';
import {environment} from '../../environments/environment.development';
const {apiUrl} = environment

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http:HttpClient) { }

  createSolution(solutionData:FormData):Observable<SolutionDto>{
    return this.http.post<SolutionDto>(`${apiUrl}/solutions`,solutionData)
  }
}
