import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

export class Readings{
  constructor(public id:number,public uid:string, public contract:number) {
  }
}
export class ReadingsView{
  constructor(public id:number,public uid:string, public contractNumber:string,public contractor:string,public tariff:string,public price:string,public date:string) {
  }
}
export class ReadingItem{
  constructor(public id:number,public readingId:number,element:string,public wear:string) {
  }
}
interface readingsList{
  readingList:ReadingsView[]
}


@Injectable({
  providedIn: 'root'
})
export class ReadingsService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<readingsList>(`${environment.url}/api/v1/reading/getall`)
  }
}
