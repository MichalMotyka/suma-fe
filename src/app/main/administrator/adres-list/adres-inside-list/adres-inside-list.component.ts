import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { AdresInsideListDataSource, AdresInsideListItem } from './adres-inside-list-datasource';
import {Adres, AdresService} from "../../../../service/adres/adres.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AdresRemoveComponent} from "../adres-remove/adres-remove.component";
import {AdresFormComponent} from "../adres-form/adres-form.component";

@Component({
  selector: 'app-adres-inside-list',
  templateUrl: './adres-inside-list.component.html',
  styleUrls: ['./adres-inside-list.component.css']
})
export class AdresInsideListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AdresInsideListItem>;
  dataSource!: MatTableDataSource<Adres>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','gus','typ','actions'];
  private subscribsion!: Subscription;

  constructor(private adres:AdresService,private dialogs:MatDialog) {
  }


  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subscribsion = this.adres.getAllAdres("3231").subscribe({
        next: value => {
          this.dataSource = new MatTableDataSource(value.adresys);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    )
  }

  add() {

  }

  close() {
    this.dialogs.closeAll();
  }

  remove(row:any) {
    this.dialogs.open(AdresRemoveComponent,{data:{rows:row,service:this.adres}}).afterClosed().subscribe(value => {
      this.subscribsion.unsubscribe();
      this.addValue()
    })
  }

  view(row:any) {
    this.dialogs.open(AdresFormComponent,{data:{rows:row,viewMode:true}})
  }
}
