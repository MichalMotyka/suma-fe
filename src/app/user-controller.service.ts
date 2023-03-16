import { Injectable } from '@angular/core';
import {Roles, RolesList, User, UserItem} from "./service/users.service";
import {CookieService} from "ngx-cookie-service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {


  username!:string
  roleName!:string
  roles!: Roles[]
  constructor() { }

  public setUserData(user: UserItem){
    this.username = user.name;
    this.roleName = user.roleName;
    this.roles = user.role;
  }

  public getRoleByName(name:string){
    return this.roles.find(value => value.name == name);
  }


}
