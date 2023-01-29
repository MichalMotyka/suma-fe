import {Component, Inject, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {Meter, MeterService} from "../../../../meter.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.css']
})
export class MeterFormComponent implements OnInit {
  name: any;
  viewMode: boolean = false;
  fazowoscDic:string[] = ["1","3"];
  fazowosc!: string;
  model: any;
  formGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    model: new FormControl('',Validators.required),
    faz: new FormControl('',Validators.required)
  })

  formatter = (result: string) => result.toUpperCase();
  constructor(@Inject(MAT_DIALOG_DATA) data: {viewMode: boolean,row:Meter},private meterService:MeterService,private dialog:MatDialog,private toaster:ToastrService) {
    if(data.viewMode){
      this.formGroup.get('name')?.disable()
      this.formGroup.get('model')?.disable()
      this.formGroup.get('faz')?.disable()
      this.name = data.row.name;
      this.fazowosc = data.row.faz;
      this.model = data.row.model
      this.viewMode = data.viewMode;
    }
  }

  fazSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.fazowoscDic.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );



  ngOnInit(): void {
  }

  save() {
    this.fazowoscDic.forEach((faz,index)=>{
      if (faz == this.fazowosc){
        this.meterService.create(new Meter(0,this.name,this.model,this.fazowosc,"")).subscribe(value => {
          if(value.status == 201){
            this.toaster.success("Pomyslnie dodano licznik do słownika","Sukces",{
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
            this.dialog.closeAll();
          }else{
            this.toaster.error("Nie udało się utworzyć licznika, wartość już istnieje","Błąd",{
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
          }
        });
      }else if(this.fazowoscDic.length == index+1){
        this.toaster.error("Nie udało się utworzyć licznika, wartość fazowości jest nieprawidłowa","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })

  }
}
