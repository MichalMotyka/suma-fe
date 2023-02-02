import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";

export interface ComponentList {
  componentList:ComponentItem[]
}
export class ComponentItem{
  constructor(public id:number,
  public name:string,
  public typ:string,
  public active:string) {}
}

export class ComponentPriceItem{
  constructor(public id:number,
              public name:string,
              public typ:string,
              public active:string,
              public price:number) {}
}

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<ComponentList>(`${environment.url}/api/v1/component/get_all`);
  }
  save(component:ComponentItem){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/component/save`,component)
  }
  delete(component:ComponentItem){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/component/delete`,{body:component})
  }
  getById(id:number){
    return this.http.get<ComponentItem>(`${environment.url}/api/v1/component/get_by?id=`+id);
  }

  search(value: string) {
    return this.http.get<ComponentList>(`${environment.url}/api/v1/component/search?data=`+value)
  }
}
