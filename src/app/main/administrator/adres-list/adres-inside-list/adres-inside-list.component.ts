import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Adres, AdresService} from "../../../../service/adres/adres.service";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdresRemoveComponent} from "../adres-remove/adres-remove.component";
import {AdresFormComponent} from "../adres-form/adres-form.component";
import {AdresInsideFormComponent} from "./adres-inside-form/adres-inside-form.component";

@Component({
  selector: 'app-adres-inside-list',
  templateUrl: './adres-inside-list.component.html',
  styleUrls: ['./adres-inside-list.component.css']
})
export class AdresInsideListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Adres>;
  dataSource!: MatTableDataSource<Adres>;

  displayedColumns = ['id', 'name','gus','typ','actions'];
  private subscribsion!: Subscription;
  parentAdres:Adres;

  constructor(@Inject(MAT_DIALOG_DATA) data: {adres: any},private adres:AdresService,private dialogs:MatDialog) {
    this.parentAdres = data.adres;
  }


  ngOnInit() {
    this.addValue();
  }

  addValue(){
    this.subscribsion = this.adres.getAllAdres(this.parentAdres.gus).subscribe({
        next: value => {
          this.dataSource = new MatTableDataSource(value.adresys);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      }
    )
  }

  add() {
    this.dialogs.open(AdresInsideFormComponent,{data:{adres:this.parentAdres,instance:this,viewMode:false}});
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
    this.dialogs.open(AdresInsideFormComponent,{data:{rows:row,viewMode:true,adres:this.parentAdres}})
  }
}
