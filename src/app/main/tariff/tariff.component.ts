import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ComponentItem, ComponentService} from "../../component.service";
import {ComponentFormComponent} from "../component/component-form/component-form.component";
import {ComponentConfirmComponent} from "../component/component-confirm/component-confirm.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Tariff, TariffList, TariffService} from "../../tariff.service";
import {TariffFormComponent} from "./tariff-form/tariff-form.component";
import {TariffConfirmComponent} from "./tariff-confirm/tariff-confirm.component";
import {SharedService} from "../utils/shared/shared.service";

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css']
})
export class TariffComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TariffList>;
  dataSource:any;
  displayedColumns = ['name', 'tarif_id','actions'];
  formModule: any = TariffFormComponent;
  private subcription!: Subscription;
  private searchSub!: Subscription;
  constructor(private tariffService:TariffService,private dialog:MatDialog, private sharedService: SharedService) {
    this.searchSub = this.sharedService.getClieckEvent().subscribe(value => {
      if (value != '' && value != undefined) {
        tariffService.search(value).subscribe(data => {
          this.dataSource = new MatTableDataSource(data.tarifList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }else {
        this.addValue()
      }
    })
    this.dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe();
      this.addValue();
    })
  }


  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subcription = this.tariffService.getAll().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.tarifList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }
    })
  }

  view(row:Tariff){
    this.dialog.open(TariffFormComponent,{data:{component:row,viewMode:true}})
  }

  remove(row:Tariff) {
    this.dialog.open(TariffConfirmComponent,{data:{component:row}})
  }

}
