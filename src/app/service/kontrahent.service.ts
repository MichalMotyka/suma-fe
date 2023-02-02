import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CountryCreateResponse} from "../main/administrator/country-list/country-form/country-form.component";
import {CountryItem} from "../country.service";

export  interface  KontrahentList{
  kontrahentList:Kontrahent[];
}

export class Kontrahent{
  // id:number;
  // numerKlienta:string;
  // pesel:string;
  // nip:string;
  // prosument:string;
  // saldo:number;
  // adres:number;
  // ulica:string;
  // adresKores:number;
  // ulicaKores:String;


  constructor(public id: number,
              public numerKlienta: string,
              public nazwa: string,
              public pesel: string,
              public nip: string,
              public prosument: string,
              public saldo: number,
              public adres: number,
              public ulica: string,
              public adresKores: number,
              public ulicaKores: string,
              public ppe:string,
              public state:string) {

  }
}


@Injectable({
  providedIn: 'root'
})
export class KontrahentService {

  constructor(private http:HttpClient) { }

  save(kontrahent:Kontrahent){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/kontrahent/save`,kontrahent);
  }
  getById(id:string){
    return this.http.get<Kontrahent>(`${environment.url}/api/v1/kontrahent/get?id=`+id)
  }
  remove(id:number){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/kontrahent/delete?id=`+id);
  }

  getAll(){
    return this.http.get<KontrahentList>(`${environment.url}/api/v1/kontrahent/list`)
  }
  getByUid(uid:number){
    return this.http.get<Kontrahent>(`${environment.url}/api/v1/kontrahent/get_uid?uid=`+uid)
  }

  search(value: string) {
    return this.http.get<KontrahentList>(`${environment.url}/api/v1/kontrahent/search?data=`+value)
  }
}
