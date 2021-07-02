import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ServerPointService } from '../server-point/server-point.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService {

  url;
  constructor(
    public http: HttpClient,
    public serverPoint:ServerPointService
  ) { 
    this.url = serverPoint.point();
  }

  login(user: any): Observable<any> {
    console.log(user)
    return this.http.post(`${this.url}user/loginUser`, user, { headers: { 'Content-Type': 'application/json' } })
  }

}
