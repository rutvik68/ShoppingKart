
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

// const baseUrl = 'http://localhost:5000/user'


@Injectable({
  providedIn: 'root'
})



export class ApicallService {

  api: string = 'http://localhost:5000/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  AddUser(data: any): Observable<any> {
    let API_URL = `${this.api}/user`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  LoginUser(data: any): Observable<any> {
    let API_LOGIN = `${this.api}/login`;
    return this.httpClient.post(API_LOGIN, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getUser() {
    
    let API_GET = `${this.api}/username`;
    return this.httpClient.get(API_GET,{
      observe: 'body',
      params:new HttpParams().append('token',localStorage.getItem('token') || 1)
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  getUserinfo(data:any):Observable<any>{
    let info ={
      id:data
    }
    
    let API_GETUSER = `${this.api}/getuser`;
    return this.httpClient.post(API_GETUSER, info)
    .pipe(
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
