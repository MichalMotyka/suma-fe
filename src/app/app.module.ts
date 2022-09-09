import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
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
    AdresFormCityComponent
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
      ToastrModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
