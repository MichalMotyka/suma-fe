import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserControllerService} from "../../user-controller.service";

class Elements {
  name:string='';
  routes:string=''
  constructor(name:string,routes:string) {
    this.name=name;
    this.routes=routes;
  }
}

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  moduleElements: Elements[]=[new Elements("Adresy","adresList"),new Elements("Kraje","countryList"),new Elements("Liczniki","meterGet"), new Elements("Użytkownicy","usersGetAll")];

  constructor(private router:Router, private userController:UserControllerService) { }

  ngOnInit(): void {
  }

  validatePermision(name: string) {
    return this.userController.getRoleByName(name)?.active
  }

  runModule(element:Elements) {
    if(element.name == 'Adresy'){
      this.router.navigate(["main/adres_list"])
    }
    if(element.name == 'Kraje'){
      this.router.navigate(["main/country_list"])
    }
    if(element.name == 'Liczniki'){
      this.router.navigate(["main/meter_list"])
    }
    if(element.name == 'Użytkownicy'){
      this.router.navigate(["main/users"])
    }

  }
}
