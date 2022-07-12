import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptorInterceptor implements HttpInterceptor {
  errorMessage: any;
  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    // return next.handle(authReq);
    return next.handle(request).pipe(
      tap(evt => {
        // custom api errors
        if (evt instanceof HttpResponse) {
          // this.loaderService.hide();
          if (evt.body.error == true) {
            this.errorMessage = evt.body.message;
            // this.notification.publishMessages(this.errorMessage, 'danger', 1);
          }
          // console.log('evt', evt);
        }
      }),

      catchError((error: HttpErrorResponse) => {
        // this.loaderService.hide();
        // console.log(error);

        if (error.error instanceof ErrorEvent) {
          //client-side error
          this.errorMessage = `Error: ${error.error.message}`;
          // console.log('hEre');
        } else {
          // server-side error

          switch (error.status) {
            case 503: {
              this.errorMessage =
                'An Internal Error Occured. Our Engineers Have Been Contacted';
              // this.notification.publishMessages(this.errorMessage, 'danger', 1);
              break;
            }
            case 500: {
              this.errorMessage =
                'An Internal Error Occured. Our Engineers Have Been Contacted';
              // this.notification.publishMessages(this.errorMessage, 'danger', 1);
              break;
            }
            case 400: {
              // this.notification.publishMessages(
              //   error.error.message,
              //   'danger',
              //   1
              // );
              break;
            }
            case 403: {
              // this.notification.publishMessages(
              //   error.error.message,
              //   'danger',
              //   1
              // );
              break;
            }
            case 404: {
              this.errorMessage =
                'An Error Occured While Processing Your Request. Please Try Again';
              // this.notification.publishMessages(this.errorMessage, 'danger', 1);
              break;
            }
            case 401: {
              // this.notification.publishMessages(
              //   error.error.message,
              //   'danger',
              //   1
              // );
              this.router.navigate(['/']);
              sessionStorage.clear();
              break;
            }
            case 405: {
              this.errorMessage =
                'An Error Occured While Processing Your Request. Please Try Again';
              // this.notification.publishMessages(this.errorMessage, 'danger', 1);
              break;
            }
            case 0: {
              this.errorMessage =
                'A Connection Error Occured. Please Check Your Network Connection';
              // this.notification.publishMessages(this.errorMessage, 'danger', 1);
              break;
            }
          }
        }

        // const err = new Error('test'); 
        // return throwError(() => err);

        return throwError(error.error);
      })
    );
  }
}
