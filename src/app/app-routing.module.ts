import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {KontrahentTableComponent} from "./main/kontrahent-table/kontrahent-table.component";
import {AdresListComponent} from "./main/administrator/adres-list/adres-list.component";
import {CountryComponent} from "./main/administrator/country-list/country.component";
import {ComponentComponent} from "./main/component/component.component";
import {TariffComponent} from "./main/tariff/tariff.component";
import {PriceListComponent} from "./main/price-list/price-list.component";
import {ContractComponent} from "./main/contract/contract.component";
import {MeterListComponent} from "./main/administrator/meter-list/meter-list.component";
import {OtComponent} from "./main/ot/ot.component";


const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"main",component:MainComponent,children:[
    {path:"kontrahent_list",component:KontrahentTableComponent},
      {path:"adres_list",component:AdresListComponent},
      {path:"country_list",component:CountryComponent},
      {path:"componets_list",component:ComponentComponent},
      {path:"tariff",component:TariffComponent},
      {path:"price",component:PriceListComponent},
      {path:"contract",component:ContractComponent},
      {path:"meter_list",component:MeterListComponent},
      {path:"ot_list",component:OtComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
