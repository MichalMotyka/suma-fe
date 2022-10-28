import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {PpeService} from "../../../ppe.service";
import {MeterService} from "../../../meter.service";
import {ContractService} from "../../../contract.service";

@Component({
  selector: 'app-ot-form',
  templateUrl: './ot-form.component.html',
  styleUrls: ['./ot-form.component.css']
})
export class OtFormComponent implements OnInit {
  ot: any;
  data: any;
  pp:string[] = [];
  metterList:string[] = [];
  contractor: any;
  contract: any;
  meter: any;
  ppModel!: string;
  newMetter = false;
  action:string[] = ['Demontaż','Montaż','Wymiana','Przegląd']
  selectAction:string = '';
  replaceMetter = false;
  replacedMetter:string='';
  viewMode: boolean = false;
  formatter = (result: string) => result.toUpperCase();

  constructor(private ppService:PpeService,private meterService:MeterService, private contractService:ContractService) { }

  ngOnInit(): void {
    this.ppService.getAll().subscribe(value => {
      value.ppList.forEach(data=>{
        this.pp.push(data.uid);
      })
    })
    this.meterService.getAll("T").subscribe(value => {
      value.meterList.forEach(data=>{
        this.metterList.push(data.model.toString())
      })
    })
  }


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.pp.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  searchMetter: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.metterList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );



  setAction(value: any) {
    this.selectAction = value;
    if (value === "Montaż"){
      this.newMetter = true;
      this.replaceMetter = false;
    }else if (value === "Wymiana") {
      this.replaceMetter = true;
    }else{
      this.newMetter = false;
      this.replaceMetter = false;
    }
  }

  loadPP() {
    this.pp.forEach(pp=>{
      if (pp === this.ppModel){
        this.ppService.getById(this.ppModel).subscribe(value => {
          if (value.contract === 0){
            this.contractService.getS1ByContractor(String(value.contractor)).subscribe(data=>{
              this.contract = data.contract;
            },err=>{
              this.contract = 0;
            })
          }else {
            this.contract = value.contract;
          }
          this.contractor = value.contractor;
          this.meter = value.meter;
        })
      }
    })

  }

  save() {

  }
}
