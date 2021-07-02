import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerPointService {

  constructor() { }

  point(){
  	return "http://localhost:3000/api/";
  	// return "http://192.168.1.100:3000/api/";
  }

}
