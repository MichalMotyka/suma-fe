import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {Adres, AdresService, Adresys} from "../../../service/adres/adres.service";
import {HttpClient} from "@angular/common/http";
import {Kontrahent, KontrahentService} from "../../../service/kontrahent.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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

  formatter = (result: string) => result.toUpperCase();

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Kontrahent,viewMode:boolean},private adresService:AdresService,private kontrahenService:KontrahentService,private toaster:ToastrService,private dialog:MatDialogRef<any>) {
    this.viewMode =data.viewMode;
    if(data.viewMode){
      this.nazwa = data.row.nazwa;
      this.nip = data.row.nip;
      this.pesel = data.row.pesel;
      this.numerKlienta = data.row.numerKlienta;
      this.ulica = data.row.ulica;
      this.ulicaKores = data.row.ulicaKores;
      this.saldo = data.row.saldo;
      adresService.getAllNoStateAdresysHistoric().subscribe(
        value => {
          value.adresys.forEach(adres=>{
            this.states.push(adres.post+" "+adres.post_code+"; "+adres.name);
            this.dic.push([adres.post+" "+adres.post_code+"; "+adres.name,adres.id])
          })
          this.dic.find(output=> output[1] == data.row.adres ? this.model = output[0] : "")
          this.dic.find(output=> output[1] == data.row.adresKores ? this.concratorModel = output[0] : "")
        })

    }else{
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
