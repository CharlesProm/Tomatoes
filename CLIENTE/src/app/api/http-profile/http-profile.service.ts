import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ServerPointService } from '../server-point/server-point.service';

@Injectable({
  providedIn: 'root'
})
export class HttpProfileService {

  url;
  constructor(
    public http: HttpClient,
    public serverPoint:ServerPointService
  ) {  this.url = serverPoint.point(); }



  // test(): Observable<any> {
  //   // return this.http.get('http://localhost:3000/')
  //   return this.http.get(`${this.url}movie/listMoviesPopular`)
  // }
  getProfile(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.url}user/getProfile`, user, { headers: { 'Content-Type': 'application/json' } })
  }

  updateProfile(user: any): Observable<any> {
    console.log(user)
    return this.http.put(`${this.url}user/updateProfile`, user, { headers: { 'Content-Type': 'application/json' } })
  }

}


