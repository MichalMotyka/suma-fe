import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { KontrahentTableDataSource, KontrahentTableItem } from './kontrahent-table-datasource';
import {KontrahentFormComponent} from "./kontrahent-form/kontrahent-form.component";

@Component({
  selector: 'app-kontrahent-table',
  templateUrl: './kontrahent-table.component.html',
  styleUrls: ['./kontrahent-table.component.css']
})
export class KontrahentTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<KontrahentTableItem>;
  dataSource: KontrahentTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','ppe'];
  formModule: any=KontrahentFormComponent;

  constructor() {
    this.dataSource = new KontrahentTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
