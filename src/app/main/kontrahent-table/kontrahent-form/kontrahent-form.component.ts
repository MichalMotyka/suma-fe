import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {Adres, AdresService, Adresys} from "../../../service/adres/adres.service";
import {HttpClient} from "@angular/common/http";
import {Kontrahent, KontrahentService} from "../../../service/kontrahent.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PP, PpeService} from "../../../ppe.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-kontrahent-form',
  templateUrl: './kontrahent-form.component.html',
  styleUrls: ['./kontrahent-form.component.css']
})
export class KontrahentFormComponent implements OnInit {
  @ViewChild("pesel") peselInput!:ElementRef;
  public model: any;
  public concratorModel:any;
  nip="";
  pesel="";
  numerKlienta!:string;
  ulica!:string;
  ulicaKores!:string;
  nazwa: any;
  saldo: any;
  ppe!:string
  states:string[] = [];
  dic:any [][] = []
  viewMode!:boolean;
  formGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    adres: new FormControl('',Validators.required),
    ul: new FormControl('',Validators.required),
    koresadres: new FormControl('',Validators.required),
    koresul: new FormControl('',Validators.required)
  })

  formatter = (result: string) => result.toUpperCase();

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Kontrahent,viewMode:boolean,editMode:boolean},private adresService:AdresService,private kontrahenService:KontrahentService,private toaster:ToastrService,private dialog:MatDialogRef<any>,private ppeService:PpeService) {
    if (data.viewMode){
      this.formGroup.get("name")?.disable()
      this.formGroup.get("adres")?.disable()
      this.formGroup.get("ul")?.disable()
      this.formGroup.get("koresadres")?.disable()
      this.formGroup.get("koresul")?.disable()
    }
    this.viewMode =data.viewMode;
    if (data.viewMode || data.editMode){
      this.mapper(data.row)
    }
    if (data.editMode || !data.viewMode){
      adresService.getAllNoStateAdresys().subscribe(
        value => {
          value.adresys.forEach(adres=>{
            this.states.push(adres.post+" "+adres.post_code+"; "+adres.name);
            this.dic.push([adres.post+" "+adres.post_code+"; "+adres.name,adres.id])
          })
        })
    }
  }

  ngOnInit(): void {
  }

  mapper(data:Kontrahent){
    this.adresService.getAdresById(data.adres).subscribe(
      value => {
        this.states.push(value.post+" "+value.post_code+"; "+value.name);
        this.dic.push([value.post+" "+value.post_code+"; "+value.name,value.id])
        this.model =value.post+" "+value.post_code+"; "+value.name;
      })
    this.adresService.getAdresById(data.adresKores).subscribe(
      value => {
        this.states.push(value.post+" "+value.post_code+"; "+value.name);
        this.dic.push([value.post+" "+value.post_code+"; "+value.name,value.id])
        this.concratorModel = value.post+" "+value.post_code+"; "+value.name;
      })
    this.ppe = data.ppe;
    this.nazwa = data.nazwa;
    this.nip = data.nip;
    this.pesel = data.pesel;
    this.numerKlienta = data.numerKlienta;
    this.ulica = data.ulica;
    this.ulicaKores = data.ulicaKores;
    this.saldo = data.saldo;


  }

  save(){
    let adres:any;
    let adresKores:any;
    this.dic.find(value => value[0] == this.model ? adres = value[1] : adres="");
    this.dic.find(value => value[0] == this.concratorModel ? adresKores = value[1] : adresKores = "");
    if (adres !=""  && adresKores != "") {
      this.kontrahenService.save(new Kontrahent(0, this.numerKlienta,this.nazwa, this.pesel, this.nip, "N", 0.00, adres, this.ulica, adresKores, this.ulicaKores,this.ppe,"T")).subscribe(
        value => {
          if (value.status == 201){
            this.toaster.success("Pomyślnie utworzono kontrahenta","Sukces", {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
            this.dialog.close(this);
          }else if(value.status == 200){
            this.toaster.success("Pomyślnie zmieniono dane kontrahenta","Sukces", {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
            this.dialog.close(this);
          }else{
            this.toaster.error("Nie udało się utworzyć kontrahenta","Błąd", {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
          }
        }
      )
    }else {
      this.toaster.error("Wybrana wartość adresu nie istnieje, proszę wybrać ją ze słownika","Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    }
  }


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );




  onPeselCheanged(nipInput: HTMLInputElement) {
    if(this.pesel.length >0){
      nipInput.disabled = true;
      this.nip = "";
    }else {
      nipInput.disabled = false;
    }
  }

  onNipCheanged(peselInput: HTMLInputElement) {
    if(this.nip.length >0){
      peselInput.disabled = true;
      this.pesel = "";
    }else{
      peselInput.disabled = false;
    }
  }
}
