import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiproductService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get<any>("http://localhost:5000/apit/getproduct")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  update(d: any,a:any,b:any,i:any): Observable<any> {

    let info={
      data:d,
      account:a,
      balance:b,
      id:i
    }
    
    let API_URL = `http://localhost:5000/apit/updateproduct`;
    return this.http.put(API_URL, info)
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
