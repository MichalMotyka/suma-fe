import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule} from "@angular/material/dialog";
import { InfoComponent } from './login/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { MainNavComponent } from './main/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './main/main-nav/sidebar/sidebar.component';
import { KontrahentTableComponent } from './main/kontrahent-table/kontrahent-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { KontrahentFormComponent } from './main/kontrahent-table/kontrahent-form/kontrahent-form.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AdministratorComponent } from './main/administrator/administrator.component';
import { AdresListComponent } from './main/administrator/adres-list/adres-list.component';
import { CountryComponent } from './main/administrator/country-list/country.component';
import { UtilsComponent } from './main/utils/utils.component';
import { CountryFormComponent } from './main/administrator/country-list/country-form/country-form.component';
import { AdresFormComponent } from './main/administrator/adres-list/adres-form/adres-form.component';
import {ToastrModule} from "ngx-toastr";
import { AdresRemoveComponent } from './main/administrator/adres-list/adres-remove/adres-remove.component';
import { AdresInsideListComponent } from './main/administrator/adres-list/adres-inside-list/adres-inside-list.component';
import { AdresFormCityComponent } from './main/administrator/adres-list/adres-form-city/adres-form-city.component';
import { AdresInsideFormComponent } from './main/administrator/adres-list/adres-inside-list/adres-inside-form/adres-inside-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KontrahentConfirmComponent } from './main/kontrahent-table/kontrahent-confirm/kontrahent-confirm.component';
import { ComponentComponent } from './main/component/component.component';
import { ComponentFormComponent } from './main/component/component-form/component-form.component';
import {MatSelectModule} from "@angular/material/select";
import { ComponentConfirmComponent } from './main/component/component-confirm/component-confirm.component';
import { TariffComponent } from './main/tariff/tariff.component';
import { TariffFormComponent } from './main/tariff/tariff-form/tariff-form.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { TariffConfirmComponent } from './main/tariff/tariff-confirm/tariff-confirm.component';
import { PriceListComponent } from './main/price-list/price-list.component';
import { FormComponent } from './main/price-list/form/form.component';
import { PriceConfirmComponent } from './main/price-list/price-confirm/price-confirm.component';
import { ContractComponent } from './main/contract/contract.component';
import { ContractFormComponent } from './main/contract/contract-form/contract-form.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import { PpComponent } from './main/pp/pp.component';
import { MeterListComponent } from './main/administrator/meter-list/meter-list.component';
import { MeterFormComponent } from './main/administrator/meter-list/meter-form/meter-form.component';
import { MeterConfirmComponent } from './main/administrator/meter-list/meter-confirm/meter-confirm.component';
import { OtComponent } from './main/ot/ot.component';
import { OtFormComponent } from './main/ot/ot-form/ot-form.component';
import { ContractConfirmComponent } from './main/contract/contract-confirm/contract-confirm.component';
import { OtConfirmComponent } from './main/ot/ot-confirm/ot-confirm.component';
import { ReadingsComponent } from './main/readings/readings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InfoComponent,
    MainComponent,
    MainNavComponent,
    SidebarComponent,
    KontrahentTableComponent,
    KontrahentFormComponent,
    AdministratorComponent,
    AdresListComponent,
    CountryComponent,
    UtilsComponent,
    CountryFormComponent,
    AdresFormComponent,
    AdresRemoveComponent,
    AdresInsideListComponent,
    AdresFormCityComponent,
    AdresInsideFormComponent,
    KontrahentConfirmComponent,
    ComponentComponent,
    ComponentFormComponent,
    ComponentConfirmComponent,
    TariffComponent,
    TariffFormComponent,
    TariffConfirmComponent,
    PriceListComponent,
    FormComponent,
    PriceConfirmComponent,
    ContractComponent,
    ContractFormComponent,
    PpComponent,
    MeterListComponent,
    MeterFormComponent,
    MeterConfirmComponent,
    OtComponent,
    OtFormComponent,
    ContractConfirmComponent,
    OtConfirmComponent,
    ReadingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatSelectModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
