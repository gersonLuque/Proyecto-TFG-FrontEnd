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

  getSolutionById(solutionId:number):Observable<SolutionDto>{
    return this.http.get<SolutionDto>(`${apiUrl}/solutions/${solutionId}`);
  }

  getSolutionWithContent(solutionId:number):Observable<SolutionDto>{
    return this.http.get<SolutionDto>(`${apiUrl}/solutions/${solutionId}/content`);
  }

  getSolutionByTaskAndUser(taskId: number, userId: number):Observable<SolutionDto> {
    return this.http.get<SolutionDto>(`${apiUrl}/tasks/${taskId}/solutions/${userId}`)
  }
  createSolution(solutionData:FormData):Observable<SolutionDto>{
    return this.http.post<SolutionDto>(`${apiUrl}/solutions`,solutionData)
  }
  updateSolution(solution: FormData):Observable<SolutionDto> {
    return this.http.put<SolutionDto>(`${apiUrl}/solutions`,solution)
  }

  getSolutionsByTaskId(taskId: number):Observable<SolutionDto[]> {
    return this.http.get<SolutionDto[]>(`${apiUrl}/tasks/${taskId}/solutions`)
  }

  updateStar(solutionId: number, star: boolean): Observable<SolutionDto> {
    return this.http.put<SolutionDto>(`${apiUrl}/solutions/${solutionId}?star=${star}`, {});
  }

}
