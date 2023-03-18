import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CountryCreateResponse} from "../main/administrator/country-list/country-form/country-form.component";


export class User{
  constructor(public id:string,public name:string,public role:string,public active:boolean) {
  }
}
export interface UserList{
  userList:User[];
}
export class Roles{
  constructor(public id:number,public name:string,public active:boolean) {
  }
}
export interface RolesList{
  rolesList:Roles[];
}
export class UserItem{
  constructor(public id:string,public name:string,public password:string,public roleName:string,public role:Roles[]) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  getAllUsers(){
    return this.http.get<UserList>(`${environment.url}/api/v1/users/getAll`)
  }
  getAllRoles(){
    return this.http.get<RolesList>(`${environment.url}/api/v1/users/getroles`)
  }
  createUser(body:UserItem){
    return this.http.put<CountryCreateResponse>(`${environment.url}/api/v1/users/register`,body);
  }
  getActiveRoles(id:string){
    return this.http.get<RolesList>(`${environment.url}/api/v1/users/get_active_role?id=`+id)
  }
  upateUser(body:UserItem){
    return this.http.patch<CountryCreateResponse>(`${environment.url}/api/v1/users/update`,body)
  }
  delete(user:User){
    return this.http.delete<CountryCreateResponse>(`${environment.url}/api/v1/users/delete?id=`+user.id)
  }
}
