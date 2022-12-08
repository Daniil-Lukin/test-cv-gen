import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, switchMap } from 'rxjs';
import { Breadcrumb } from '../interfaces/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private urlArray: string[];

  constructor(private router: Router) { }

  private setUrl(): string {
    return this.router.url;
  }

  private routeBuilder(index: number) {
    return this.urlArray.slice(0,index+1).reduce((acc, curr) => `${acc}/${curr}`)
  }

  public getBreadcrumbsArray(): Breadcrumb[] {
    this.urlArray = this.setUrl().split('/');
    this.urlArray.shift();
    return this.urlArray.map((element, index) => {
      const route = this.routeBuilder(index);
      return {label: element, navigationUrl: route}
    })
  }

  getRouterArrayObservable(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd) 
    )
  }

  public getArrayLength() {
    return this.urlArray.length;
  }

}
