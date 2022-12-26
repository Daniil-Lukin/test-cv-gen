import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PositionToGet } from '../interfaces/position-to-get';
import { PositionToPost } from '../interfaces/position-to-post';

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {

  constructor(private httpClient: HttpClient) { }

  public getAllEmployeesHTTP(): Observable<PositionToGet>{
    return this.httpClient.get<PositionToGet>(`${environment.apiUrl}/positions`);
  }

  public getEmployeeHTTP(id: number | string): Observable<PositionToGet> {
    return this.httpClient.get<PositionToGet>(`${environment.apiUrl}/positions/${id}`);
  }

  public createEmployeeHTTP(data: PositionToPost) {
    return this.httpClient.post<PositionToPost>(`${environment.apiUrl}/positions`, { data });
  }

  public changeEmployeeHTTP(id: number | string, data: PositionToPost) {
    return this.httpClient.put<PositionToPost>(`${environment.apiUrl}/positions/${id}`, { data });
  }

  public deleteEmployeeHTTP(id: number | string) {
    return this.httpClient.delete<PositionToPost>(`${environment.apiUrl}/positions/${id}`);
  }
}
