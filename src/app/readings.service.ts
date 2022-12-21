import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";
import {TableSchema} from "./main/readings/readings-form/readings-table/readings-table.component";

export class Readings{
  constructor(public id:number,public uid:string, public contract:number,public contractor:number,public data:string,public status:string) {
  }
}
export class ReadingsView{
  constructor(public id:number,public uid:string, public contractNumber:string,public contractor:string,public tariff:string,public price:string,public date:string) {
  }
}
export class ReadingItem{
  constructor(public id:number,public readingId:number,public element:number,public wear:number) {
  }
}
export interface readingsList{
  readingList:TableSchema[]
}


@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<readingsList>(`${environment.url}/api/v1/reading/getall`)
  }

  create(body:Readings) {
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/reading/create`,body)
  }

  addReadings(body:ReadingItem) {
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/reading/item/create`,body)
  }

  activate(body:Readings){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/reading/activate`,body)
  }

  delete(body:Readings) {
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/reading/delete?id=`+body.id)
  }
  end(body:Readings){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/reading/end`,body)
  }
  getById(id:number){
    return this.http.get<readingsList>(`${environment.url}/api/v1/reading/getById?id=`+id)
  }
}
