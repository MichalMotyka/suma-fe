import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {KontrahentFormComponent} from "./kontrahent-form/kontrahent-form.component";
import {Kontrahent, KontrahentList, KontrahentService} from "../../service/kontrahent.service";
import { Subscription } from 'rxjs';
import {MatDialog} from "@angular/material/dialog";
import {KontrahentConfirmComponent} from "./kontrahent-confirm/kontrahent-confirm.component";

@Component({
  selector: 'app-kontrahent-table',
  templateUrl: './kontrahent-table.component.html',
  styleUrls: ['./kontrahent-table.component.css']
})
export class KontrahentTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<KontrahentList>;
  dataSource:any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','ppe','actions'];
  formModule: any = KontrahentFormComponent;
  private subcription!: Subscription;

  constructor(private kontrahentService:KontrahentService,private dialog:MatDialog) {
    dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe;
      this.addValue()
    })
  }

  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subcription = this.kontrahentService.getAll().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.kontrahentList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  remove(row:any) {
    this.dialog.open(KontrahentConfirmComponent,{data:{row:row}})
  }

  view(row:any) {
    this.dialog.open(KontrahentFormComponent,{data:{row:row,viewMode:true}})
  }
}
