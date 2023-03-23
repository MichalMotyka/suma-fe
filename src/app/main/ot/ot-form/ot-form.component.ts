import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {PpeService} from "../../../ppe.service";
import {MeterService} from "../../../meter.service";
import {ContractItem, ContractService} from "../../../contract.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ot, OtService} from "../../../ot.service";
import {KontrahentService} from "../../../service/kontrahent.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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
  aaction:string[] = ['Demontaż','Montaż','Wymiana','Przegląd']
  action:{name:string,value:string}[] = [
    {
      name:'Montaż',value:"M"
    },{
      name:'Demontaż',value:"D"
    },{
      name:'Wymiana',value:"W"
    },{
      name:'Przegląd',value:"P"
    }
  ]
  selectAction:string = '';
  replaceMetter = false;
  replacedMetter:string='';
  viewMode: boolean = false;
  editMode: boolean = false;
  formatter = (result: string) => result.toUpperCase();
  form!:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) data: { row: ot, viewMode: boolean, editMode: boolean }, private fb: FormBuilder, private ppService: PpeService, private meterService: MeterService, private contractService: ContractService, private contracotrService: KontrahentService, private otService: OtService, private toaster: ToastrService, private dialog: MatDialog) {
    this.viewMode = data.viewMode
    this.editMode = data.editMode;
    if (data.viewMode || data.editMode){
        this.ot = data.row.uid;
        this.contracotrService.getById(String(data.row.conctrator)).subscribe(value => {
          this.contractor = value.numerKlienta;
        })
      this.contractService.getById(data.row.contract).subscribe(value => {
        this.contract = value.uid;
      })
        this.selectAction = data.row.action;
        this.data = data.row.date;
        if (data.row.meter != 0){
          this.meterService.getById(String(data.row.meter)).subscribe(value => {
            this.meter = value.model;
          })
        }
        this.ppService.getByNumberId(data.row.pp).subscribe(value => {
          this.ppModel = value.uid;
        })

    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      pp:new FormControl("",Validators.required),
      actionSelection:new FormControl(null, Validators.required)
    });
    if (this.viewMode){
      this.form.get('pp')?.disable()
    }
    this.form.get("actionSelection")?.setValue(this.selectAction)

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
    if (value === "M"){
      this.newMetter = true;
      this.replaceMetter = false;
    }else if (value === "W") {
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
              this.contract = data.uid;
            },err=>{
              this.contract = 0;
            })
          }else {
            this.contractService.getById(String(value.contract)).subscribe(contract =>{
              this.contract = contract.uid;
            })

          }
          this.contracotrService.getById(String(value.contractor)).subscribe(result =>{
            this.contractor = result.numerKlienta;
          })
          this.meterService.getById(String(value.meter)).subscribe(meters=>{
            this.meter = meters.model;
          })

        })
      }
    })
  }
  save() {
    this.ppService.getById(this.ppModel).subscribe(value => {
      this.contracotrService.getByUid(this.contractor).subscribe(contractor =>{
        this.contractService.getByUid(this.contract).subscribe(contract =>{
          this.meterService.getByUid(this.meter).subscribe(meter =>{
            this.otService.save(new ot(0,"",value.id,contractor.id,String(contract.id),meter.id,this.data,this.selectAction,"S",this.replacedMetter)).subscribe(result => {
              if (result.status == 200){
                this.toaster.success("Pomyślnie dodano ot","Sukces", {
                  timeOut: 3000,
                  progressBar: true,
                  progressAnimation: "decreasing"})
                this.dialog.closeAll();
              }else {
                this.toaster.error("Błąd danych skontaktuj się z administratorem","Błąd", {
                  timeOut: 3000,
                  progressBar: true,
                  progressAnimation: "decreasing"
                })
              }
            })
          })
        })
      })
    })
  }
  edit(){
    this.ppService.getById(this.ppModel).subscribe(value => {
      this.contracotrService.getByUid(this.contractor).subscribe(contractor =>{
        this.contractService.getByUid(this.contract).subscribe(contract =>{
          this.meterService.getByUid(this.meter).subscribe(meter =>{
            this.otService.edit(new ot(0,this.ot,value.id,contractor.id,String(contract.id),meter.id,this.data,this.selectAction,"S",this.replacedMetter)).subscribe(result => {
              if (result.status == 200){
                this.toaster.success("Pomyślnie edytowano ot","Sukces", {
                  timeOut: 3000,
                  progressBar: true,
                  progressAnimation: "decreasing"})
                this.dialog.closeAll();
              }else {
                this.toaster.error("Błąd danych skontaktuj się z administratorem","Błąd", {
                  timeOut: 3000,
                  progressBar: true,
                  progressAnimation: "decreasing"
                })
              }
            })
          })
        })
      })
    })
  }
}
