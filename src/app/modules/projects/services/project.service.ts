import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataItem } from '../interfaces/data-item';
import { ProjectsToGet } from '../interfaces/projects-to-get';
import { ProjectToPost } from '../interfaces/project-to-post';
import { ProjectsToGetData } from '../interfaces/projects-to-get-data';
import { ProjectToGet } from '../interfaces/project-to-get';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {}

  public getAllProjectsHTTP(): Observable<ProjectsToGet> {
    return this.httpClient.get<ProjectsToGet>(
      `${environment.apiUrl}/projects?populate=skills`
    );
  }

  public getProjectHTTP(projectID: number): Observable<ProjectToGet> {
    return this.httpClient.get<ProjectToGet>(
      `${environment.apiUrl}/projects/${projectID}?populate=skills`
    );
  }

  public createProjectHTTP(data: ProjectToPost): Observable<ProjectsToGetData> {
    return this.httpClient
      .post<ProjectsToGetData>(`${environment.apiUrl}/projects`, {
        data,
      });
  }

  //переделать под запросы
  public changeProjectHTTP(
    data: ProjectToPost,
    projectID: number
  ): Observable<ProjectToGet> {
    return this.httpClient
      .put<ProjectToGet>(`${environment.apiUrl}/projects/${projectID}?populate=skills`, {
        data,
      });
  }

  public deleteProjectHTTP(projectID: number): Observable<ProjectToGet> {
    return this.httpClient
      .delete<ProjectToGet>(`${environment.apiUrl}/projects/${projectID}`);
  }
  //const { skills, ...other } = projectData. attributes

  public getTablesData(): Observable<DataItem[]> {
    // return this.projectsList.map((element) => {
    //   return {
        // id: String(element.id),
        // name: element.attributes.name,
        // domain: element.attributes.domain,
        // from: element.attributes.from,
        // to: element.attributes.to,
    //   }
    // })
    return this.getAllProjectsHTTP().pipe<DataItem[]>((
      map( (value) => {
        return value.data.map((element) => {
          return {
            id: String(element.id),
            name: element.attributes.name,
            domain: element.attributes.domain,
            from: element.attributes.from,
            to: element.attributes.to,
          }
        })
      } )
    ))
  }
}
