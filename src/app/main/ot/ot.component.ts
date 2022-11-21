import {Component, OnInit, ViewChild} from '@angular/core';
import {KontrahentFormComponent} from "../kontrahent-table/kontrahent-form/kontrahent-form.component";
import {OtFormComponent} from "./ot-form/ot-form.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ContractList} from "../../contract.service";
import {Subscription} from "rxjs";
import {OtService} from "../../ot.service";
import {MatDialog} from "@angular/material/dialog";
import {OtConfirmComponent} from "./ot-confirm/ot-confirm.component";

@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.css']
})
export class OtComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ContractList>;
  dataSource:any;
  formModule: any = OtFormComponent;
  displayedColumns = ['id', 'name','actions'];
  private subcription!: Subscription;
  constructor(private otService:OtService,private dialog:MatDialog) {
    dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe;
      this.addValue()
    })
  }

  ngOnInit(): void {
    this.addValue();
  }

  addValue(){
    this.subcription = this.otService.getAll().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.otList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  remove(row:any) {
    this.dialog.open(OtConfirmComponent,{data:{row:row,veryfy:false,confrim:false}})
  }

  view(row:any) {
    this.dialog.open(OtFormComponent,{data:{row:row,viewMode:true,editMode:false}})
  }

  edit(row:any) {
    this.dialog.open(OtFormComponent,{data:{row:row,viewMode:false,editMode:true}})
  }

  veryfication(row:any) {
    this.dialog.open(OtConfirmComponent,{data:{row:row,veryfy:true,confrim:false}})
  }
  confirm(row:any) {
    this.dialog.open(OtConfirmComponent,{data:{row:row,veryfy:false,confrim:true}})
  }
}
