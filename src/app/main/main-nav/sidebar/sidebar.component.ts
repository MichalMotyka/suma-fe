import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AdministratorComponent} from "../../administrator/administrator.component";

class MenuElements {
  name:string='';
  rout: string='';
  constructor(name:string,rout:string) {
    this.name = name;
    this.rout = rout;
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  elements: MenuElements[]=[
    new MenuElements("Zlecenie OT","#"),
    new MenuElements("Umowy","#"),
    new MenuElements("Kontrahent","#"),
  new MenuElements("Administrator","#")];
  constructor(private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  logout(){
    //TODO Usuwanie cookie oraz przekierowanie na okno z logowaniem
  }
  runModule(operaion:string){
    if (operaion == "Kontrahent"){
      this.router.navigate(["main/kontrahent_list"])
    }else if(operaion=="Administrator") {
      this.dialog.open(AdministratorComponent)
    }
  }


}
