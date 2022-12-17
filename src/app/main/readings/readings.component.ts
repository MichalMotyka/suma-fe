import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {PriceList} from "../../price.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ReadingsService} from "../../readings.service";
import {ReadingsFormComponent} from "./readings-form/readings-form.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {
  formModule: any = ReadingsFormComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PriceList>;
  dataSource:any;
  displayedColumns = ['name','contractor','tarif','actions'];
  private subcription!: Subscription;
  constructor(private dialog:MatDialog,private readingServices:ReadingsService,private toaster:ToastrService) {
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

  view(row:any) {
    this.dialog.open(ReadingsFormComponent,{data:{row:row,viewmode:true}})
  }

  veryfication(row:any) {
      this.readingServices.activate(row).subscribe(value => {
        if (value.status==200){
          this.toaster.success("Pomyślnie aktywowano odczyt","Sukces", {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"})
          this.dialog.closeAll();
        }
      },error => {
        this.toaster.error("Nie udało się aktywować odczytu skontaktuj się z administratorem","Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      },()=>{
        this.subcription.unsubscribe();
        this.addValue();
      })
  }
  delete(row:any){
    this.readingServices.delete(row).subscribe(value => {
      if (value.status==200){
        this.toaster.success("Pomyślnie anulowano odczyt","Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"})
        this.dialog.closeAll();
      }
    },error => {
      this.toaster.error("Nie udało się anulować odczytu skontaktuj się z administratorem","Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    },()=>{
      this.subcription.unsubscribe();
      this.addValue();
    })
  }

  end(row:any) {
    this.readingServices.end(row).subscribe(value => {
      if (value.status==200){
        this.toaster.success("Pomyślnie rozliczono odczyt","Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"})
        this.dialog.closeAll();
      }
    },error => {
      this.toaster.error("Nie udało się rozliczyć odczytu skontaktuj się z administratorem","Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    },()=>{
      this.subcription.unsubscribe();
      this.addValue();
    })
  }
}
