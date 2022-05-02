import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  api: string = 'http://localhost:5001/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  AddProduct(data: any): Observable<any> {
    let API_URL = `${this.api}/upload`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  removeProduct(data: any): Observable<any> {
    let API_URL = `${this.api}/remove`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateProduct(data: any): Observable<any> {
    let API_URL = `${this.api}/update`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  getOrder(): Observable<any> {
    let API_URL = `${this.api}/orderstatus`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.handleError)
      )
  }

  changeOrder(i:any,s:any): Observable<any> {
    let info={
      id:i,
      status:s
    }
    console.log(info);
    
    let API_URL = `${this.api}/orderstatusupdate`;
    return this.httpClient.post(API_URL,info)
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
