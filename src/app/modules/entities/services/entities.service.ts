import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntityData } from '../interfaces/entity-data';
import { SkillsResponse } from '../interfaces/skills-response';
import { EntityToGet } from '../interfaces/entity-to-get';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  constructor(private httpClient: HttpClient) {}

  public getEntityHTTP(
    id: number,
    entityType = 'skills'
  ): Observable<EntityToGet> {
    const params = new HttpParams({
      fromObject: { 'pagination[withCount]': false },
    });
    return this.httpClient.get<EntityToGet>(
      `${environment.apiUrl}/${entityType}/${id}`,
      { params }
    );
  }

  public getEntityArrayHTTP(entityType = 'skills'): Observable<EntityData[]> {
    const params = new HttpParams({
      fromObject: { 'pagination[withCount]': false },
    });
    return this.httpClient
      .get<SkillsResponse>(`${environment.apiUrl}/${entityType}`, { params })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  public createEntityHTTP(
    name: string,
    entityType = 'skills'
  ): Observable<SkillsResponse> {
    return this.httpClient.post<SkillsResponse>(
      `${environment.apiUrl}/${entityType}`,
      { data: { name } }
    );
  }

  public changeEntityHTTP(
    name: string,
    id: number,
    entityType: string
  ): Observable<SkillsResponse> {
    return this.httpClient.put<SkillsResponse>(
      `${environment.apiUrl}/${entityType}/${id}`,
      {
        data: { name },
      }
    );
  }

  public deleteEntityHTTP(id: number, entityType: string) {
    return this.httpClient.delete(`${environment.apiUrl}/${entityType}/${id}`);
  }
}
