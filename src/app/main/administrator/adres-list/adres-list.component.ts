import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AdresFormComponent} from "./adres-form/adres-form.component";
import {CountryItem} from "../../../country.service";
import {Adres, AdresService} from "../../../service/adres/adres.service";
import {MatDialog} from "@angular/material/dialog";
import {AdresRemoveComponent} from "./adres-remove/adres-remove.component";
import {AdresInsideListComponent} from "./adres-inside-list/adres-inside-list.component";


@Component({
  selector: 'app-adres-list',
  templateUrl: './adres-list.component.html',
  styleUrls: ['./adres-list.component.css']
})
export class AdresListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Adres>;
  dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','GUS','actions'];
  formModule: any=AdresFormComponent;
  subscribsion:any;
  constructor(private adres:AdresService,private dialog:MatDialog) {
    this.dialog.afterAllClosed.subscribe( value => {
        this.subscribsion.unsubscribe();
        this.addValue();
      }
    )
  }


  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subscribsion = this.adres.getAllState().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.adresys);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      }
    )
  }

  getRow(displayedColumns: Adres) {
      this.dialog.open(AdresInsideListComponent,{disableClose:true,minWidth:500,data:{adres:displayedColumns}})
  }

  remove(row:any) {
     this.dialog.open(AdresRemoveComponent,{data:{rows:row,service:this.adres}}).afterClosed().subscribe(value => {
       this.subscribsion.unsubscribe();
       this.addValue()
     })
  }

  add() {
    this.dialog.open(AdresFormComponent,{data:{viewMode:false,service:this.adres}});
  }

  view(row:any) {
    this.dialog.open(AdresFormComponent,{data:{rows:row,viewMode:true}})
  }
}
