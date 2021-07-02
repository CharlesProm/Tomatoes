import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ServerPointService } from '../server-point/server-point.service';

@Injectable({
  providedIn: 'root'
})
export class HttpSignupService {
  url;
  constructor(
    private http: HttpClient,
    private serverPoint: ServerPointService
  ) {
    this.url = serverPoint.point();
   }


  signup(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.url}user/signup`, user, { headers: { 'Content-Type': 'application/json' } })
  }


}
