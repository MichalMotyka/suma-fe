import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ComponentItem, ComponentList, ComponentPriceItem} from "./component.service";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";

export class Price{
  constructor(
    public id:number,
    public uid:string,
    public name:string,
    public tarif:number,
    public tarif_name:string,
    public active:string,
    public components:ComponentPriceItem[]) {
  }
}
export interface PriceList{
  PriceList:Price[]
}


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<PriceList>(`${environment.url}/api/v1/price/get_all`);
  }
  getByUid(body:Price){
    return this.http.get<PriceList>(`${environment.url}/api/v1/price/get_by?id=`+body.uid)
  }
  save(body:Price){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/price/save`,body)
  }
  delete(body:Price){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/price/delete?id=`+body.uid)
  }
  getById(id:string){
    return this.http.get<Price>(`${environment.url}/api/v1/price/get_by_id?id=`+id)
  }

  search(value: string) {
    return this.http.get<PriceList>(`${environment.url}/api/v1/price/search?data=`+value)
  }
}
