import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  constructor(private notificationService: NzNotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((failedReq: HttpErrorResponse) => {
        let errorMessage = '';
        if(failedReq.error instanceof ErrorEvent) {
          this.notificationService.error(
            failedReq.error.error.name,
            failedReq.error.error.message,
          )
          errorMessage = failedReq.error.error.message;
        } else {
          this.notificationService.error(
            failedReq.status.toString(),
            failedReq.statusText,
          )
          errorMessage = failedReq.statusText;
        }
        return throwError(errorMessage);
      })
    );;
  }
}
