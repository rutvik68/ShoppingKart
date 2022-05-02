import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  api: string = 'http://localhost:5000/apih';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  getProduct(id:any): Observable<any>{

    let API_URL = `${this.api}/history`;
    let info={
      data:id,
    }
    return this.http.post(API_URL,info)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getorderstatus(id:any): Observable<any>{

    let API_URL = `${this.api}/orderstatus`;
    let info={
      data:id,
    }
    return this.http.post(API_URL,info)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
