import {Component, Inject, INJECTOR, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Adres, AdresService} from "../../../../service/adres/adres.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {CountryService} from "../../../../country.service";

@Component({
  selector: 'app-adres-form',
  templateUrl: './adres-form.component.html',
  styleUrls: ['./adres-form.component.css']
})
export class AdresFormComponent implements OnInit {

  viewMode: boolean;
  name!: string;
  GUS!: string;
  service: AdresService;
  country!: string;
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    gus: new FormControl('', [Validators.required]),
    kraj: new FormControl('', [Validators.required])
  })
  states:string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: { rows: any, viewMode: boolean, service: AdresService }, private toaster: ToastrService, private dialog: MatDialog,private countryService:CountryService) {
    this.viewMode = data.viewMode;
    this.service = data.service;
    this.formGroup.get("gus")?.disable()
    if (this.viewMode) {
      this.formGroup.get('name')?.disable()
      this.formGroup.get('gus')?.disable()
      this.formGroup.get('kraj')?.disable()
      this.name = data.rows.name;
      this.GUS = data.rows.gus;
      this.formGroup.get("kraj")?.setValue(data.rows.country)
    }else {
      countryService.getAllData().subscribe(value => {
        value.countries.forEach(ctr=>{
          if (ctr.active === "T"){
            this.states.push(ctr.name)
          }
        })
      })
    }
  }

  ngOnInit(): void {

  }

  create() {
    this.country = <string>this.formGroup.get('kraj')?.value;
    this.service.createState(new Adres(0, this.name, this.GUS, "województwo", "T", "", "",this.country)).subscribe(value => {
      if (value.status == 201) {
        this.toaster.success("Pomyslnie dodano województwo do słownika", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      } else {
        this.toaster.error("Nie udało się utworzyć województwa, wartość już istnieje", "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    });
  }
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  formatter = (result: string) => result.toUpperCase();

  setValidator() {
    this.formGroup.get("gus")?.enable()
    this.countryService.getByName(<String>this.formGroup.get("kraj")?.value).subscribe(value => {
      this.formGroup.get("gus")?.setValidators([Validators.required,Validators.pattern(value.gusMask)])
      this.formGroup.updateValueAndValidity()
    })
  }
}
