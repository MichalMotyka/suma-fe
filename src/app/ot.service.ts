import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";

export interface otList{
  otList:ot[];
}

export class ot {
  constructor(public id: number, public uid: string, public pp: number, public conctrator: number, public contract: string, public meter: number, public date: string, public action: string,public status:string,public replace:string) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class OtService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<otList>(`${environment.url}/api/v1/ot/get_all`)
  }
  delete(ot:ot){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/ot/delete?id=`+ot.id)
  }

  save(ot:ot) {
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/ot/create`,ot)
  }

  edit(ot: ot) {
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/ot/edit`,ot)
  }
  veryfication(ot:ot){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/ot/veryfy`,ot)
  }
}
