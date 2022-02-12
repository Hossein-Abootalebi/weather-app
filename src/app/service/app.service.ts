import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class AppService {

  constructor(private http:HttpClient) { }

  private searchUrl = 'api/location/'

  findWoeId(city:string){
    let query ={query:city}
    return this.http.get(environment.weather.concat(this.searchUrl).concat('search/'),{params:query})

  }

  search(id:number,date:string){

    return this.http.get(environment.weather.concat(this.searchUrl).concat(id + '/').concat(date))
  }


}
