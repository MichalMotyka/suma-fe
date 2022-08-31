import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdresListDataSource, AdresListItem } from './adres-list-datasource';
import {AdresFormComponent} from "./adres-form/adres-form.component";

@Component({
  selector: 'app-adres-list',
  templateUrl: './adres-list.component.html',
  styleUrls: ['./adres-list.component.css']
})
export class AdresListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AdresListItem>;
  dataSource: AdresListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  formModule: any=AdresFormComponent;

  constructor() {
    this.dataSource = new AdresListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
