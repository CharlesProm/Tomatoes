import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ServerPointService } from '../server-point/server-point.service';


@Injectable({
  providedIn: 'root'
})
export class HttpCommentaryService {

  url;
  constructor(
    public http: HttpClient,
    public serverPoint:ServerPointService
  ) { 
    this.url = serverPoint.point();
  }

  addCommentary(commentary: any): Observable<any> {
    return this.http.post(`${this.url}commentary/addCommentary`, commentary, { headers: { 'Content-Type': 'application/json' } })
  }

  getCommentary(movie): Observable<any> {
    console.log(movie)
    return this.http.post(`${this.url}commentary/getCommentary`, movie, { headers: { 'Content-Type': 'application/json' } })
  }
}
