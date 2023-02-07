import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CvAttributes } from '../../../core/interfaces/cv-interfaces/cv-attributes';
import { CvToGet } from '../../../core/interfaces/cv-interfaces/cv-to-get';
import { CvsToGet } from '../../../core/interfaces/cv-interfaces/cvs-to-get';


@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) { }

  public getAllCvHTTP(): Observable<CvsToGet> {
    return this.httpClient.get<CvsToGet>(`${environment.apiUrl}/cvs`);
  }

  public getCvHTTP(id: string | number): Observable<CvToGet> {
    return this.httpClient.get<CvToGet>(`${environment.apiUrl}/cvs/${id}`);
  }

  public changeCvHTTP(data: CvAttributes, id:string | number): Observable<CvToGet> {
    return this.httpClient.put<CvToGet>(`${environment.apiUrl}/cvs/${id}`, {data});
  }

  public createCvHTTP(data: CvAttributes): Observable<CvToGet> {
    return this.httpClient.post<CvToGet>(`${environment.apiUrl}/cvs`, {data});
  }

  public deleteCvHTTP(id: string | number): Observable<CvToGet> {
    return this.httpClient.delete<CvToGet>(`${environment.apiUrl}/cvs/${id}`);
  }
}
