import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {KontrahentTableComponent} from "./main/kontrahent-table/kontrahent-table.component";
import {AdresListComponent} from "./main/administrator/adres-list/adres-list.component";
import {CountryComponent} from "./main/administrator/country-list/country.component";


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"main",component:MainComponent,children:[
    {path:"kontrahent_list",component:KontrahentTableComponent},
      {path:"adres_list",component:AdresListComponent},
      {path:"country_list",component:CountryComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
