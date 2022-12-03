import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {PriceList} from "../../price.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReadingsService} from "../../readings.service";

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {
  formModule: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PriceList>;
  dataSource:any;
  displayedColumns = ['name','contractor','tarif','actions'];
  private subcription!: Subscription;
  constructor(private dialog:MatDialog,private readingServices:ReadingsService) {
    this.dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe();
      this.addValue();
    })
  }

  ngOnInit(): void {
    this.addValue()
  }


  addValue(){
    this.subcription = this.readingServices.getAll().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.readingList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }


  remove(row:any) {

  }

  view(row:any) {

  }
}
