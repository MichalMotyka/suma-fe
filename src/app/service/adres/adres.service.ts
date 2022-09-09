import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CountryItem} from "../../country.service";
import {CountryCreateResponse} from "../../main/administrator/country-list/country-form/country-form.component";

export  interface  Adresys{
  adresys:Adres[];
}

export class Adres {
  id:number;
  name:string;
  gus:string;
  type:string
  active:string;
  constructor(id:number,name:string,GUS:string,type:string,active:string) {
  this.id = id;
  this.name = name;
  this.gus = GUS;
  this.type = type;
  this.active = active;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdresService {

  constructor(private http:HttpClient) { }

  getAllState(){
    return this.http.get<Adresys>("http://localhost:8080/api/v1/adres/get_state")
  }
  createState(value:Adres){
    return this.http.put<CountryCreateResponse>("http://localhost:8080/api/v1/adres/create",value);
  }
  delete(value:Adres){
    return this.http.delete("http://localhost:8080/api/v1/adres/delete_state",{body:value});
  }
  getAllAdres(gus:string){
    return this.http.get<Adresys>("http://localhost:8080/api/v1/adres/get_adres?gus="+gus);
  }
}
