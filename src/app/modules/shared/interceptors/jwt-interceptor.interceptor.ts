import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private bannedReqUrl: string[] = ['auth/local']; //url:port/auth/local

  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    if(!this.checkEndpoint(request.url)) {
      request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.storageService.getJwt()}`,
      },
    });
  }
    return next.handle(request);
  }

  private checkEndpoint(url: string): boolean {
    return this.bannedReqUrl.some((element) => url.endsWith(element))
  }
}
