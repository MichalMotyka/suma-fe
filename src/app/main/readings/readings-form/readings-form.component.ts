import {Component, Inject, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {KontrahentService} from "../../../service/kontrahent.service";
import {ContractItem, ContractService} from "../../../contract.service";
import {TableSchema} from "./readings-table/readings-table.component";
import {ReadingItem, Readings, ReadingsService} from "../../../readings.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-readings-form',
  templateUrl: './readings-form.component.html',
  styleUrls: ['./readings-form.component.css']
})
export class ReadingsFormComponent implements OnInit {
  pphasError: boolean = false;
  ppcounter =0;
  dataError: boolean = true;
  datacounter = 0;
  viewMode: boolean = false;
  data: any;
  contractor: string[]=[];
  contractorModel!:string;
  contract!: ContractItem;
  contractUId:string=''
  tableData:TableSchema[]=[]
  readingsId!:string;
  formatter = (result: string) => result.toUpperCase();
  constructor(@Inject(MAT_DIALOG_DATA) data: { row: Readings, viewmode: boolean},private contractorServeice:KontrahentService,private contractService:ContractService,private readingsService:ReadingsService,private toaster:ToastrService, private dialog:MatDialog) {
    this.viewMode = data.viewmode
    if (data.viewmode){
      this.readingsId = String(data.row.id)
      this.contractService.getById(String(data.row.contract)).subscribe(
        value => {
          this.contractUId = value.uid
        }
      )
      this.contractorServeice.getById(String(data.row.contractor)).subscribe(
        value => {
          this.contractorModel = value.numerKlienta+' ('+value.nazwa+')'
        }
      )
      this.data = data.row.data
    }else {
      contractorServeice.getAll().subscribe(value => {
        value.kontrahentList.forEach(kontrahent => {
          this.contractor.push(kontrahent.numerKlienta + " (" + kontrahent.nazwa + ")")
        })
      })
    }
  }

  ngOnInit(): void {
  }



  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.contractor.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );



  loadContractors() {
    this.ppcounter++
    if (this.contractorModel.charAt(this.contractorModel.length-1) === ')') {
      this.contractService.getByContractor(this.contractorModel.split(" (")[0]).subscribe(value => {
        this.contract = value
        this.contractUId = value.uid
      })
      this.pphasError = false
    }else {
      this.pphasError = true
    }

  }

  save() {
    let id = '';
    this.readingsService.create(new Readings(0,"",this.contract.id,this.contract.contract,this.data,"S")).subscribe(value => {
      if (value.status == 200){
        id = value.message
        this.toaster.success("Pomyślnie utworzono odczyt","Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"})
        this.dialog.closeAll();
      }else {
        this.toaster.error("Nie udało się utworzyć odczytu, umowa nie istnieje","Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    },err=>{
      this.toaster.error("Nie udało się utworzyć odczytu, umowa nie istnieje","Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    },()=>{
      for (const data of this.tableData){
        this.readingsService.addReadings(new ReadingItem(0,Number(id),data.id,data.value)).subscribe()
      }
    })
  }

  getData(event: TableSchema[]) {
    this.tableData = event;
  }

  dataHasErrpr(event:any) {
    this.datacounter++
    if (event.value != null){
      this.dataError = false;
    }
  }
}
