import {Component, OnInit, ViewChild} from '@angular/core';
import {CountryFormComponent} from "../country-list/country-form/country-form.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {CountryItem} from "../../../country.service";
import {MeterFormComponent} from "./meter-form/meter-form.component";
import {MeterService} from "../../../meter.service";
import {MatDialog} from "@angular/material/dialog";
import {MeterConfirmComponent} from "./meter-confirm/meter-confirm.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-meter-list',
  templateUrl: './meter-list.component.html',
  styleUrls: ['./meter-list.component.css']
})
export class MeterListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CountryItem>;
  dataSource:any;

  formModule:any = MeterFormComponent;
  subscrytpion!:Subscription


  displayedColumns = ['id','name',"actions"];
  constructor(private meterService:MeterService,private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.addValue();
    this.dialog.afterAllClosed.subscribe(value => {
        this.subscrytpion.unsubscribe();
        this.addValue();
      }
    )
  }

  addValue(){
    this.subscrytpion = this.meterService.getAll("T").subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.meterList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  remove(row:any) {
      this.dialog.open(MeterConfirmComponent,{data:{row:row}})
  }

  view(row:any) {
    this.dialog.open(MeterFormComponent,{data:{viewMode:true,row:row}})
  }
}
