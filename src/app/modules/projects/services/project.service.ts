import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectsToGet } from '../interfaces/projects-to-get';
import { ProjectToPost } from '../interfaces/project-to-post';
import { ProjectsToGetData } from '../interfaces/projects-to-get-data';
import { ProjectToGet } from '../interfaces/project-to-get';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  
  private params = new HttpParams({fromObject: {'populate': 'skills'}});

  constructor(private httpClient: HttpClient) {}

  public getAllProjectsHTTP(): Observable<ProjectsToGet> {
    const params = this.params;
    return this.httpClient.get<ProjectsToGet>(
      `${environment.apiUrl}/projects`, {params}
    );
  }

  public getProjectHTTP(projectID: number): Observable<ProjectToGet> {
    const params = this.params;
    return this.httpClient.get<ProjectToGet>(
      `${environment.apiUrl}/projects/${projectID}`, {params}
    );
  }

  public createProjectHTTP(data: ProjectToPost): Observable<ProjectsToGetData> {
    return this.httpClient
      .post<ProjectsToGetData>(`${environment.apiUrl}/projects`, {
        data,
      });
  }

  public changeProjectHTTP(
    data: ProjectToPost,
    projectID: number
  ): Observable<ProjectToGet> {
    return this.httpClient
      .put<ProjectToGet>(`${environment.apiUrl}/projects/${projectID}`, {
        data,
      });
  }

  public deleteProjectHTTP(projectID: number): Observable<ProjectToGet> {
    return this.httpClient
      .delete<ProjectToGet>(`${environment.apiUrl}/projects/${projectID}`);
  }

}
