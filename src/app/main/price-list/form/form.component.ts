import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Price, PriceService} from "../../../price.service";
import {ComponentItem, ComponentPriceItem, ComponentService} from "../../../component.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {KontrahentFormComponent} from "../../kontrahent-table/kontrahent-form/kontrahent-form.component";
import {Tariff, TariffService} from "../../../tariff.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Kontrahent, KontrahentList} from "../../../service/kontrahent.service";
import {numbers} from "@material/dialog";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public model: any;
  name:string = "";
  tarifId:number = 0;
  tarifInputName:string =""
  tarifName:string[] = [];
  selectedTarif!:string;
  tarif:Tariff[] = [];
  component:ComponentPriceItem[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ComponentPriceItem>;
  dataSource:any;
  viewMode:boolean;
  private subcription!: Subscription;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','price'];
  formatter = (result: string) => result.toUpperCase();
  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Price[],viewMode:boolean},private dialogRef:MatDialogRef<any>,private priceService:PriceService,private toaster:ToastrService,private dialog:MatDialog,private tariffService:TariffService,private componentService:ComponentService) {
    dialogRef.disableClose = true;
    if (data.viewMode){
      this.viewMode = data.viewMode;
      this.name = data.row[0].name;
      this.tarifInputName = data.row[0].tarif_name;
      console.log(data.row)
      this.component = data.row[0].components;
      this.addValue();
    }else {
      this.viewMode = false;
    }
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.tariffService.getAll().subscribe(value => {
        value.tarifList.forEach(data => {
          this.tarif.push(data)
          this.tarifName.push(data.name)
        })
        console.log(this.tarif)
        this.tarif[0].component_id.forEach(data => {
          this.componentService.getById(data).subscribe(component => {
            this.component.push(new ComponentPriceItem(component.id, component.name, component.typ, component.active, 0));
          })
        })
      })
    }
  }

  create(){
    this.priceService.save(new Price(0,"",this.name,this.tarifId,this.selectedTarif,"T",this.component)).subscribe(value => {
      if (value.status == 201){
        this.toaster.success("Pomyślnie utworzono cennik","Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
    }else{
        this.toaster.error("Nie udało się utworzyć cennika","Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }

  updateArray(){
    if (!this.viewMode) {
      this.tarif.forEach(value => {
        if (value.name == this.tarifInputName) {
          this.selectedTarif = this.tarifInputName;
          this.tarifId = value.id;
          this.component = [];
          value.component_id.forEach((data, i) => {
            this.componentService.getById(data).subscribe(component => {
              this.component.push(new ComponentPriceItem(component.id, component.name, component.typ, component.active, 0));
              i === value.component_id.length - 1 ? this.addValue() : null;
            })
          })
        } else if (value.name != this.tarifInputName && this.component.length != 0) {
          this.component = [];
          this.addValue();
        }
      })
    }
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.tarifName.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  addValue(){
        this.dataSource = new MatTableDataSource(this.component);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  }

}
