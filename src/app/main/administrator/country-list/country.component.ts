import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {CountryFormComponent} from "./country-form/country-form.component";
import {MatDialog} from "@angular/material/dialog";
import {CountryItem, CountryService} from "../../../country.service";
import {CountryFormServiceService} from "../../../service/country-form-service.service";
import {AdresRemoveComponent} from "../adres-list/adres-remove/adres-remove.component";

@Component({
  selector: 'app-country-list',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements  OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CountryItem>;
  dataSource:any;
  test:any;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','prefix','postMask','gusMask',"actions"];
  formModule:any = CountryFormComponent;
  adresRemove:any = AdresRemoveComponent;
  constructor(private dialog:MatDialog,private country:CountryService,private countryForm:CountryFormServiceService) {
      dialog.afterAllClosed.subscribe(value => {
        this.test.unsubscribe;
        this.addValue()
      })
  }

  ngOnInit() {
    this.addValue();
  }

  addValue(){
     this.test = this.country.getAllData().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.countries);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  getRow(displayedColumns: CountryItem) {
    this.countryForm.setCurrRow(displayedColumns);
    this.dialog.open(this.formModule,{data:{viewMode:true}})
  }

  remove(row:any) {
    this.dialog.open(this.adresRemove,{data:{rows:row,service:this.country}})
  }
}
