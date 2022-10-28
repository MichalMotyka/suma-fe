import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {KontrahentList} from "../../service/kontrahent.service";
import {KontrahentFormComponent} from "../kontrahent-table/kontrahent-form/kontrahent-form.component";
import {Subscription} from "rxjs";
import {Price, PriceList, PriceService} from "../../price.service";
import {FormComponent} from "./form/form.component";
import {MatDialog} from "@angular/material/dialog";
import {PriceConfirmComponent} from "./price-confirm/price-confirm.component";

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PriceList>;
  dataSource:any;
  formModule: any = FormComponent;
  displayedColumns = ['name','tarif','actions'];
  private subcription!: Subscription;

  constructor(private priceService:PriceService,private dialog:MatDialog) {
    this.dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe();
      this.addValue();
    })
  }

  ngOnInit(): void {
    this.addValue();
  }

  addValue(){
    this.subcription = this.priceService.getAll().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.PriceList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  remove(row:Price) {
    this.dialog.open(PriceConfirmComponent,{data:{row:row}})
  }

  view(row:Price) {
    this.priceService.getByUid(row).subscribe(value => {
      this.dialog.open(FormComponent,{data:{row:value.PriceList,viewMode:true}})
    })
  }
}
