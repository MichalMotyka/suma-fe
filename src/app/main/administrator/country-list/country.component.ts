import {AfterViewInit, Component, Output, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CountryDataSource, CountryItem } from './country-datasource';
import {CountryFormComponent} from "./country-form/country-form.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-country-list',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CountryItem>;
  dataSource: CountryDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  formModule:any = CountryFormComponent;
  constructor(private dialog:MatDialog,private http: HttpClient) {
    this.dataSource = new CountryDataSource(http);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getRow(displayedColumns: string[]) {
    this.dialog.open(this.formModule,{data:{displayedColumns}})
  }
}
