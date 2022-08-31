import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

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
  moduleElements: Elements[]=[new Elements("Adresy","adres_list"),new Elements("Kraje","country_list")];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  runModule(element:Elements) {
    this.router.navigate(["main/"+element.routes])
  }
}
