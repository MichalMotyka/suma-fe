import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {CountryCreateResponse} from "./main/administrator/country-list/country-form/country-form.component";

export class ContractItem{
  constructor(public id:number,
              public uid:string,
              public contract:number,
              public payer:number,
              public adres:number,
              public tarif:number,
              public price:number,
              public ot:number,
              public roz:string,
              public endDate:string,
              public state:string,
              public faza:string) { }
}

@Injectable({
  providedIn: 'root'
})

export class ContractService {

  constructor(private http:HttpClient) { }

  save(body:ContractItem){
     return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/contract/create`,body)
  }
  getS1ByContractor(id:string){
    return this.http.get<ContractItem>(`${environment.url}/api/v1/contract/getByPP?id=`+id)
  }
}
