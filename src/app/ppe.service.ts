import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

interface ppList{
  ppList:PP[];
}

export class PP {
  constructor(
    public id:number,
    public uid:string,
    public contractor:number,
    public payer:number,
    public contract:number,
    public meter:number,
    public status:string) {
  }


}

@Injectable({
  providedIn: 'root'
})
export class PpeService {

  constructor(private http:HttpClient) { }

create(body:PP){
    return this.http.put(`${environment.url}/api/v1/pp/create`,body)
}
getActive(){
    return this.http.get<ppList>(`${environment.url}/api/v1/pp/get?active=T`)
}
getAll(){
  return this.http.get<ppList>(`${environment.url}/api/v1/pp/get?active=Z`)
}
getById(id:string){
    return this.http.get<PP>(`${environment.url}/api/v1/pp/getByUid?id=`+id)
}

}

