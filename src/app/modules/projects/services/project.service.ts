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
  private projectsList: ProjectsToGetData[];
  public projectsSubject: Subject<ProjectsToGetData[]> = new Subject<ProjectsToGetData[]>();

  constructor(private httpClient: HttpClient) {}

  public getAllProjectsHTTP(): Observable<ProjectsToGet> {
    return this.httpClient.get<ProjectsToGet>(
      `${environment.apiUrl}/projects`
    );
  }

  public getProjectHTTP(projectID: number): Observable<ProjectToGet> {
    return this.httpClient.get<ProjectToGet>(
      `${environment.apiUrl}/projects/${projectID}`
    );
  }

  public getAllProjects(): ProjectsToGetData[] {
    return this.projectsList;
  }

  public getProject(projectID: number): ProjectsToGetData {
    return this.projectsList.find((element) => element.id === projectID);
  }

  public createProject(projectData: ProjectToPost): Observable<ProjectsToGetData> {
    return this.httpClient
      .put<ProjectsToGetData>(`${environment.apiUrl}/projects`, {
        projectData,
      })
      .pipe(
        map((response) => {
          this.addProject(response);
          return response;
        })
      );
  }
//Подумать по поводу takeUntill()
  public changeProject(
    projectData: ProjectToPost,
    projectID: number
  ): Observable<ProjectToGet> {
    return this.httpClient
      .post<ProjectToGet>(`${environment.apiUrl}/projects/${projectID}`, {
        projectData,
      })
      .pipe(
        map((response) => {
          this.changeValue(response);
          return response;
        })
      );
  }

  public deleteProject(projectID: number): Observable<ProjectToGet> {
    return this.httpClient
      .delete<ProjectToGet>(`${environment.apiUrl}/projects/${projectID}`)
      .pipe(
        map((response) => {
          this.deleteValue(response.data.id);
          return response;
        })
      );
  }
  
  public setProjects(projectsList: ProjectsToGet) {
    this.projectsList = projectsList.data;
    this.updateValue();
  }

  private addProject(projectData: ProjectsToGetData): void {
    this.projectsList.push(projectData);
    this.updateValue();
  }

  private deleteValue(projectID: number): void {
    const index = this.projectsList.indexOf(
      this.projectsList.find((element) => element.id === projectID)
    );
    this.projectsList.splice(index, 1);
    this.updateValue();
  }
  

  private changeValue(projectData: ProjectToGet) {
    const index = this.projectsList.indexOf(
      this.projectsList.find(
        (element) => element.id === projectData.data.id
      )
    );
    this.projectsList.splice(index, 1, projectData.data);
    this.updateValue();
  }


  private updateValue(): void {
    this.projectsSubject.next(this.projectsList);
  }

  public getTablesData(): DataItem[] {
    const DataItemList: DataItem[] = [];
    for(let index = 0; index < this.projectsList.length; index++) {
      console.log(1);
      DataItemList.push({
        name: this.projectsList[index].attributes.name,
        domain: this.projectsList[index].attributes.domain,
        from: this.projectsList[index].attributes.from,
        to: this.projectsList[index].attributes.to
      })
    }
    return DataItemList;
  }
}
