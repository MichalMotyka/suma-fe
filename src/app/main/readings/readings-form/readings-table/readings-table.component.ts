import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {PriceList} from "../../../../price.service";
import {Subscription} from "rxjs";
import {ContractItem, ContractService} from "../../../../contract.service";
import {TariffService} from "../../../../tariff.service";
import {ComponentService} from "../../../../component.service";

export class TableSchema{
  constructor(public id:number,
              public name:string,
              public prev:number,
              public value:number,
              public used:number) {
  }

}

@Component({
  selector: 'app-readings-table',
  templateUrl: './readings-table.component.html',
  styleUrls: ['./readings-table.component.css']
})
export class ReadingsTableComponent implements OnInit,OnChanges {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PriceList>;
  dataSource!: MatTableDataSource<TableSchema>;
  displayedColumns = ['name','contractor','tarif'];
  private subcription!: Subscription;
  private tableDataSet:TableSchema[] = []
  @Input() contract!:ContractItem
  @Output() eventTask = new EventEmitter<TableSchema[]>()
  constructor(private tarrifService:TariffService,private componentService:ComponentService) {

  }

  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.subcription){
      this.subcription.unsubscribe()
    }
    this.addValue()
  }

  edit(){
    this.eventTask.emit(this.tableDataSet)
  }

  addValue() {
    this.subcription = this.tarrifService.getById(this.contract.tarif).subscribe({
      next: value => {
        this.tarrifService.getByUid(value.tarif_id).subscribe(tarifList => {
          tarifList.tarifList.forEach((componet,index) => {
            this.componentService.getById(Number(componet.component_id)).subscribe(componentData => {
              this.tableDataSet.push(new TableSchema(componentData.id, componentData.name, 0, 0, 0));
              if(tarifList.tarifList.length-1 === index){
                this.dataSource = new MatTableDataSource(this.tableDataSet);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
              }
            })
          })
        })
      }
    })
  }
}
