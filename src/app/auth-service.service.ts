import { BaseService } from './base.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from './Models/login';
import { Signup } from './Models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpclient: HttpClient) {
   }

   
  public signIn(payload:Login):Observable<Login>{
    let dataURL:string = `${environment.serverUrl}/user/login/v2`;
    return this.httpclient.post<Login>(dataURL, payload)
  }

  public signUp(payload:Signup):Observable<Signup>{
    let dataURL:string = `${environment.serverUrl}/user/`;
    return this.httpclient.post<Signup>(dataURL, payload)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error("An error occurred:", error.error.message);
    } else {
      if (
        error.status === 401 ||
        error.status === 504 ||
        error.status === 400
      ) {
        return throwError(
          JSON.stringify({
            name: error.error,
            status: error.status,
            message: error.message,
          })
        );
      }
    }
    return throwError(
      JSON.stringify({
        name: error.name,
        status: error.status,
        message: error.message,
      })
    );
  }

}
