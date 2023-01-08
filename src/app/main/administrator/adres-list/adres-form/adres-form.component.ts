import {Component, Inject, INJECTOR, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Adres, AdresService} from "../../../../service/adres/adres.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-adres-form',
  templateUrl: './adres-form.component.html',
  styleUrls: ['./adres-form.component.css']
})
export class AdresFormComponent implements OnInit {

  viewMode:boolean;
  name!:string;
  GUS!:string;
  service:AdresService;
  formGroup = new FormGroup({
      name:new FormControl('',Validators.required),
      gus:new FormControl('',[Validators.required]),
      kraj:new FormControl('',Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) data:{rows:any,viewMode: boolean,service:AdresService},private toaster: ToastrService,private dialog:MatDialog) {
    this.viewMode = data.viewMode;
    this.service = data.service;
    if(this.viewMode){
        this.name = data.rows.name;
        this.GUS = data.rows.gus;
    }
  }

  ngOnInit(): void {
  }

  create() {
    this.service.createState(new Adres(0,this.name,this.GUS,"województwo","T","","")).subscribe(value => {
      if(value.status == 201){
        this.toaster.success("Pomyslnie dodano województwo do słownika","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.toaster.error("Nie udało się utworzyć województwa, wartość już istnieje","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    });
  }
}
