import {Component, OnInit, ViewChild} from '@angular/core';
import {ComponentFormComponent} from "../component/component-form/component-form.component";
import {ContractFormComponent} from "./contract-form/contract-form.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {KontrahentList, KontrahentService} from "../../service/kontrahent.service";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {ContractItem, ContractList, ContractService} from "../../contract.service";
import {ContractConfirmComponent} from "./contract-confirm/contract-confirm.component";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ContractList>;
  dataSource:any;
  formModule: any = ContractFormComponent;
  displayedColumns = ['id', 'name','actions'];
  private subcription!: Subscription;
  constructor(private contractService:ContractService,private dialog:MatDialog) {
    dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe;
      this.addValue()
    })
  }

  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subcription = this.contractService.getAll().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.contractList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  remove(row:any) {
    this.dialog.open(ContractConfirmComponent,{data:{row:row}});
  }

  view(row:ContractItem) {
    this.dialog.open(ContractFormComponent,{data:{row:row,viewMode:true,editMode:false}})
  }

  edit(row:any) {
    this.dialog.open(ContractFormComponent,{data:{row:row,viewMode:false,editMode:true}})
  }

  veryfication(row:any) {
    this.dialog.open(ContractConfirmComponent,{data:{row:row,activate:true,end:false}});
  }

  end(row:any) {
    this.dialog.open(ContractConfirmComponent,{data:{row:row,activate:false,end:true}});
  }
}
