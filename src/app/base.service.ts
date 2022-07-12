import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }
}
