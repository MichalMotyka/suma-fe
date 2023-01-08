import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {CountryService} from "../../../../country.service";
import {CountryFormServiceService} from "../../../../service/country-form-service.service";
import {CountryComponent} from "../country.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export class CountryItem {
  id: number;
  name: string;
  prefix: string;
  postMask: string;
  gusMask: string;
  active:string;

  constructor(id: number, name: string, prefix: string, gusMask: string, postMask: string) {
    this.id = id;
    this.name = name;
    this.prefix = prefix
    this.gusMask = gusMask;
    this.postMask = postMask;
    this.active ="T"
  }
}

export class CountryCreateResponse {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string

  constructor(error: string, message: string, path: string, status: number, timestamp: string) {
    this.error = error;
    this.message = message;
    this.path = path;
    this.status = status
    this.timestamp = timestamp;
  }
}

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {
  name: string = ""
  prefix: string = ""
  postMask: string = ""
  gusMask: string = ""
  viewMode: boolean;

  countryFormV = new FormGroup({
    countryName:new FormControl('',Validators.required),
    prefix: new FormControl('',[Validators.required,Validators.max(4)]),
    maskaGus: new FormControl('',[Validators.required,Validators.pattern('A*0*-*')]),
    maskaKodu: new FormControl('',[Validators.required,Validators.pattern('A*0*-*')])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {viewMode: boolean},
    private toaster: ToastrService,
    private country: CountryService,
    private dialog:MatDialog,
    private countryForm:CountryFormServiceService) {
    this.viewMode = data.viewMode;
    if (this.viewMode){
      let row:CountryItem= countryForm.getCurrRow();
      this.name = row.name;
      this.prefix = row.prefix;
      this.postMask = row.postMask;
      this.gusMask = row.gusMask;
    }
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.countryFormV.value)
    // if (this.name.length > 4, this.prefix.length > 1) {
    //   this.addNewCountry(new CountryItem(0, this.name, this.prefix, this.gusMask, this.postMask));
    //   this.dialog.closeAll();
    // } else {
    //   this.toaster.error("Błędnie wypełniono formularz, dane nie zostały zapisane", "Błąd", {
    //     timeOut: 3000,
    //     progressBar: true,
    //     progressAnimation: "decreasing"
    //   })
    // }
  }

  addNewCountry(value: CountryItem) {
    this.country.addData(value);
  }
  getCountryNameControl(){
    return this.countryFormV.get('countryName')?.invalid && this.countryFormV.get('countryName')?.touched;
  }
  getPrefixConrol(){
    return this.countryFormV.get('prefix')?.invalid && this.countryFormV.get('prefix')?.touched;
  }
  getMaskaKoduControl(){
    return this.countryFormV.get('maskaKodu')?.invalid && this.countryFormV.get('maskaKodu')?.touched;
  }
  getGusMakControl(){
    return this.countryFormV.get('maskaGus')?.invalid && this.countryFormV.get('maskaGus')?.touched;
  }

}
