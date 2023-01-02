import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntityData } from '../interfaces/entity-data';
import { ForkJoinResponse } from '../interfaces/fork-join-response';
import { SkillsResponse } from '../interfaces/skills-response';
import { Entities } from '../enums/entities.enum';
import { EntityToGet } from '../interfaces/entity-to-get';


@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  private _entityType: string;
  private entitiesStorage = {
    skills: new BehaviorSubject([]),
    responsibilities: new BehaviorSubject([]),
    languages: new BehaviorSubject([]),
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  public setEntityType(): void {
    this._entityType = this.router.url.split('/').pop();
    console.log(this._entityType);
  }

  public getEntityHTTP(id: number, entityType = 'skills'): Observable<EntityToGet> {
    const params = new HttpParams({fromObject: {'pagination[withCount]': false}});
    return this.httpClient.get<EntityToGet>(`${environment.apiUrl}/${entityType}/${id}`, { params });
  }

  public getEntityArrayHTTP(
    entityType = 'skills'
  ): Observable<EntityData[]> {
    const params = new HttpParams({fromObject: {'pagination[withCount]': false}});
    return this.httpClient
      .get<SkillsResponse>(
        `${environment.apiUrl}/${entityType}`, { params }
      )
      .pipe(
        map((response) => {
          return response.data;
          })
        );
  }

  public createEntity(name: string, entityType = 'skills' ): Observable<SkillsResponse> {
    return this.httpClient.post<SkillsResponse>(
      `${environment.apiUrl}/${entityType}`,
      { data: { name } }
    );
  }

  public changeEntity(name: string, id: number): Observable<SkillsResponse> {
    return this.httpClient
      .put<SkillsResponse>(`${environment.apiUrl}/${this._entityType}/${id}`, {
        data: { name },
      })
  }

  public deleteEntity(id: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/${this._entityType}/${id}`
    );
  }

  public get entityType(): string {
    return this._entityType;
  }

  public getEntitiesData(): Observable<ForkJoinResponse> {
    return forkJoin(
      Object.values(Entities).reduce((acc, key) => ({
        ...acc,
        [key]: this.getEntityArrayHTTP(key)
      }), {})
    )
  }

  public setEntitiesData(response: ForkJoinResponse): void {
    Object.entries(response).forEach(([key,value]) => {
      this.entitiesStorage[key].next(value);
    });
  }

  public updateStoragedData(
    entityData: EntityData[],
    entityType = this.entityType
  ): void {
    this.entitiesStorage[entityType].next(entityData);
  }

  public getEntity(entityType = 'skills'): BehaviorSubject<EntityData[]>{
    return this.entitiesStorage[entityType];
  }
}
