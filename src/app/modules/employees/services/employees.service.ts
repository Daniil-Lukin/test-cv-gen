import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PositionsToGet } from '../interfaces/positions-to-get';
import { PositionToGetData } from '../interfaces/positions-to-get-interfaces/position-to-get-data';
import { PositionToPost } from '../interfaces/position-to-post';
import { PositionToGet } from '../interfaces/position-to-get';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient: HttpClient) { }

  public getAllEmployeesHTTP(): Observable<PositionsToGet>{
    return this.httpClient.get<PositionsToGet>(`${environment.apiUrl}/positions`);
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