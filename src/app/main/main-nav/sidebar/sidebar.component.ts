import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AdministratorComponent} from "../../administrator/administrator.component";
import {UserControllerService} from "../../../user-controller.service";

class MenuElements {
  name: string = '';
  rout: string = '';

  constructor(name: string, rout: string) {
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
  elements: MenuElements[] = [
    new MenuElements("Zlecenie OT", "otGetAll"),
    new MenuElements("Umowy", "contractGetAll"),
    new MenuElements("Kontrahent", "contractorList"),
    new MenuElements("Składniki", "componentGetAll"),
    new MenuElements("Administrator", "admin"),
    new MenuElements("Taryfa", "tarifGetAll"),
    new MenuElements("Cennik", "priceGetAll"),
    new MenuElements("Odczyty", "readingGetAll")];
  name!: string
  roleName!: string;

  constructor(private router: Router, private dialog: MatDialog, private userController: UserControllerService) {
    this.name = userController.username
    this.roleName = userController.roleName
  }

  ngOnInit(): void {
  }

  logout() {
    //TODO Usuwanie cookie oraz przekierowanie na okno z logowaniem
  }

  validatePermision(name: string) {
    if (name == 'admin' && (this.userController.getRoleByName("countryList") || this.userController.getRoleByName("usersGetAll") || this.userController.getRoleByName("adresList") || this.userController.getRoleByName("meterGet"))) {
      return true;
    }
    return this.userController.getRoleByName(name)?.active

  }

  runModule(operaion: string) {
    if (operaion == "Kontrahent") {
      this.router.navigate(["main/kontrahent_list"])
    } else if (operaion == "Administrator") {
      this.dialog.open(AdministratorComponent)
    } else if (operaion == "Składniki") {
      this.router.navigate(["main/componets_list"])
    } else if (operaion == "Taryfa") {
      this.router.navigate(["main/tariff"])
    } else if (operaion == "Cennik") {
      this.router.navigate(["main/price"])
    } else if (operaion == "Umowy") {
      this.router.navigate(["main/contract"])
    } else if (operaion == "Zlecenie OT") {
      this.router.navigate(["main/ot_list"])
    } else if (operaion == "Odczyty") {
      this.router.navigate(["main/readings"])
    }
  }


}
