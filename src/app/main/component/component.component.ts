import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {KontrahentList} from "../../service/kontrahent.service";
import {Subscription} from "rxjs";
import {ComponentItem, ComponentList, ComponentService} from "../../component.service";
import {ComponentFormComponent} from "./component-form/component-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AdresRemoveComponent} from "../administrator/adres-list/adres-remove/adres-remove.component";
import {ComponentConfirmComponent} from "./component-confirm/component-confirm.component";
import {SharedService} from "../utils/shared/shared.service";

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ComponentItem>;
  dataSource:any;
  displayedColumns = ['id', 'name','actions'];
  formModule: any = ComponentFormComponent;
  private subcription!: Subscription;
  private searchSub!: Subscription;
  constructor(private componentService:ComponentService,private dialog:MatDialog,private sharedService: SharedService) {
    this.searchSub = this.sharedService.getClieckEvent().subscribe(value => {
      if (value != '' && value != undefined) {
        componentService.search(value).subscribe(data => {
          this.dataSource = new MatTableDataSource(data.componentList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }else {
        this.addValue()
      }
    })
    this.dialog.afterAllClosed.subscribe(value =>{
      this.subcription.unsubscribe();
      this.addValue();
    })
  }

  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subcription = this.componentService.getAll().subscribe({
      next: value => {
        value.componentList.forEach(data => data.typ == "R" ? data.typ = "Zużyciowy" : data.typ="Oddanie")
        this.dataSource = new MatTableDataSource(value.componentList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  view(row:ComponentItem){
    this.dialog.open(ComponentFormComponent,{data:{component:row,viewMode:true}})
  }

  remove(row:ComponentItem) {
    this.dialog.open(ComponentConfirmComponent,{data:{component:row}})
  }
}
