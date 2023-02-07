import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeToGet } from '../../../core/interfaces/employee-interfaces/employee-to-get';
import { EmployeeToPost } from '../../../core/interfaces/employee-interfaces/employee-to-post';
import { EmployeesToGet } from '../../../core/interfaces/employee-interfaces/employees-to-get';
;

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private httpClient: HttpClient) { }

  public getAllEmployeesHTTP(): Observable<EmployeesToGet>{
    return this.httpClient.get<EmployeesToGet>(`${environment.apiUrl}/users`);
  }

  public getEmployeeHTTP(id: number | string): Observable<EmployeeToGet> {
    return this.httpClient.get<EmployeeToGet>(`${environment.apiUrl}/users/${id}`);
  }

  public createEmployeeHTTP(data: EmployeeToPost): Observable<EmployeeToGet> {
    return this.httpClient.post<EmployeeToGet>(`${environment.apiUrl}/users`, { data });
  }

  public changeEmployeeHTTP(id: number | string, data: EmployeeToPost): Observable<EmployeeToGet> {
    return this.httpClient.put<EmployeeToGet>(`${environment.apiUrl}/users/${id}`, { data });
  }

  public deleteEmployeeHTTP(id: number | string): Observable<EmployeeToGet> {
    return this.httpClient.delete<EmployeeToGet>(`${environment.apiUrl}/users/${id}`);
  }
}
