import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ServerPointService } from '../server-point/server-point.service';

@Injectable({
  providedIn: 'root'
})
export class HttpMovieService {
  url;
  constructor(
    public http: HttpClient,
    public serverPoint:ServerPointService
  ) {  this.url = serverPoint.point(); }


  getPopularMovies(): Observable<any> {
    // return this.http.get('http://localhost:3000/')
    return this.http.get(`${this.url}movie/listMoviesPopular`)
  }

  addRating(data: any): Observable<any> {
    return this.http.post(`${this.url}movie/ratingMovie`, data, { headers: { 'Content-Type': 'application/json' } })
  }

  addFavourite(data: any): Observable<any> {
    return this.http.post(`${this.url}movie/addFavourite`, {movie:data.movie, user: data.user}, { headers: { 'Content-Type': 'application/json' } })
  }

  getFavouriteMovie(user:any): Observable<any> {
    return this.http.post(`${this.url}movie/getFavouriteMovie`,  {user: user}, { headers: { 'Content-Type': 'application/json' } })
  }

}
