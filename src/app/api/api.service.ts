import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }
  apiUrl = 'http://127.0.0.1:8000/newdemo';
  token = "Bearer Cy5YBGTEwOCpSkilwp1rLqswinPFLmpTThgz99mVTMNO7kUw33ABUfPLB1MC";
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Get client-side error\n${error.error.message}`;
    } else {
      errorMessage = `Get server-side error\nError Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }
  getalldata() {
    return this.http.get(this.apiUrl + '/alldata', {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  newpost(data: any) {
    return this.http.post(this.apiUrl + '/demotest', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  updateUser(data: any) {
    return this.http.post(this.apiUrl + '/userupdate', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  usersearch(id: any) {
    return this.http.get(this.apiUrl + '/usersearch/' + id, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  userdelete(id: any) {
    return this.http.delete(this.apiUrl + '/userdelete/' + id, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }





  mutiplesPost(data: any) {
    return this.http.post(this.apiUrl + '/uploadmultiples', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  viewallmultidata() {
    return this.http.get(this.apiUrl + '/viewallmultidata', {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  multiusersearch(id: any) {
    return this.http.get(this.apiUrl + '/multiusersearch/' + id, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }


} 
