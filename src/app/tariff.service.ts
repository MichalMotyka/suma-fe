import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";

export interface TariffList{
  tarifList:Tariff[];
}
export class Tariff{
  constructor(
    public id:number,
    public tarif_id:string,
    public name:string,
    public component_id:number[],
    public active:string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class TariffService {

  constructor(private http:HttpClient) { }

  getAll(){
   return this.http.get<TariffList>(`${environment.url}/api/v1/tariff/get_all`)
  }
  create(body:Tariff){
   return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/tariff/save`,body)
  }
  drop(body:Tariff){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/tariff/delete?id=`+body.tarif_id)
  }
  getById(id:number){
    return this.http.get<Tariff>(`${environment.url}/api/v1/tariff/get?id=`+id)
  }
  getByUid(uid:string){
    return this.http.get<TariffList>(`${environment.url}/api/v1/tariff/getByUid?uid=`+uid)
  }

  search(value: string) {
    return this.http.get<TariffList>(`${environment.url}/api/v1/tariff/search?data=`+value)
  }
}
