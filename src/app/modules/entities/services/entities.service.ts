import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  raceWith,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntitiesStorage } from '../interfaces/entities-storage';
import { EntityData } from '../interfaces/entity-data';
import { ForkJoinResponse } from '../interfaces/fork-join-response';
import { SkillsResponse } from '../interfaces/skills-response';

enum entities {
  skills,
  responsibilities,
  languages,
}

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  private _entityType: string; //skills responsibillities languages
  private entitiesStorage = {
    skills: new BehaviorSubject([]),
    responsibilities: new BehaviorSubject([]),
    languages: new BehaviorSubject([]),
  }
  private entitiesTypes = ['skills', 'responsibilities', 'languages']

  constructor(private httpClient: HttpClient, private router: Router) {}

  public setEntityType(): void {
    this._entityType = this.router.url.split('/').pop();
    console.log(this._entityType);
  }

  public getEntityArray(
    entityType = this._entityType
  ): Observable<EntityData[]> {
    return this.httpClient
      .get<SkillsResponse>(
        `${environment.apiUrl}/${entityType}?pagination%5BwithCount%5D=false`
      )
      .pipe(map((response) => response.data));
  }

  public createEntity(name: string): Observable<SkillsResponse> {
    return this.httpClient.post<SkillsResponse>(
      `${environment.apiUrl}/${this._entityType}`,
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
    return forkJoin({
      skills: this.getEntityArray('skills'),
      languages: this.getEntityArray('languages'),
      responsibilities: this.getEntityArray('responsibilities'),
    });
  }

  public setEntitiesData(response: ForkJoinResponse): void {
    for(let type of this.entitiesTypes) {
      this.entitiesStorage[type].next(response[type]);
      console.log(this.entitiesStorage)
    }
  }

  public updateStoragedData(
    entityData: EntityData[],
    entityType = this.entityType
  ): void {
    this.entitiesStorage[entityType].next(entityData);
  }

  public getEntity(entityType = this.entityType): BehaviorSubject<any>{
    return this.entitiesStorage[entityType];
  }
}
