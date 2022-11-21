import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";

export interface MeterList{
  meterList:Meter[]
}

export class Meter {
  constructor(public id:number,
              public name:string,
              public model:string,
              public faz:string,
              public status:string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  constructor(private http:HttpClient) { }

  create(body:Meter){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/meter/create`,body)
  }
  getAll(param:string){
    return this.http.get<MeterList>(`${environment.url}/api/v1/meter/get?status=`+param);
  }
  remove(id:string){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/meter/remove?id=`+id)
  }
  getById(id:string){
    return this.http.get<Meter>(`${environment.url}/api/v1/meter/get_id?id=`+id)
  }
  getByUid(uid:string){
    return this.http.get<Meter>(`${environment.url}/api/v1/meter/get_uid?uid=`+uid)
  }
}
