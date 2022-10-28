import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, OperatorFunction} from "rxjs";
import {map} from "rxjs/operators";
import {Kontrahent, KontrahentService} from "../../../service/kontrahent.service";
import {Tariff, TariffService} from "../../../tariff.service";
import {Price, PriceService} from "../../../price.service";
import {Adres, AdresService} from "../../../service/adres/adres.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ContractItem, ContractService} from "../../../contract.service";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
  viewMode: boolean = false;
  contractor:string[] = [];
  contracotDic:Kontrahent[] = [];
  payer:string[] = [];
  payerDic:Kontrahent[] = [];
  tarifDic:Tariff[] = [];
  tarif:string[] = [];
  price:string[] = [];
  priceDic:Price[] = [];
  numerKlienta!: string;
  numberPlatnika!:string;
  adres!:string;
  taryfa!:string;
  cennik!: string;
  fazowosc!: string;
  fazowoscDic:string[] = ["1","3"];
  endDate!: string;
  data!: string;
  ContractorObj!:Kontrahent;
  PayerObj!:Kontrahent;
  AdresObj!:Adres;
  TarifObj!:Tariff;
  PriceObj!:Price;


  formatter = (result: string) => result.toUpperCase();
  constructor(private contractorServis:KontrahentService,private tarifService:TariffService,private priceService:PriceService,private adresService:AdresService,private dialog:MatDialogRef<any>,private contractorService:ContractService) {
    dialog.disableClose = true;
  }

  ngOnInit(): void {
    this.setContractorDic();
    this.setTarifDic();
  }

  setContractorDic(){
    this.contractorServis.getAll().subscribe(value => {
      value.kontrahentList.forEach(contrator=>{
        if (contrator.state =="T"){
          this.contracotDic.push(contrator);
          this.contractor.push(contrator.nazwa+" ("+contrator.numerKlienta+")")
          this.payerDic.push(contrator);
          this.payer.push(contrator.nazwa+" ("+contrator.numerKlienta+")")
        }
      })
    })
  }
  setTarifDic(){
    this.tarifService.getAll().subscribe(value => {
      value.tarifList.forEach(tarif=>{
        if (tarif.active=="T"){
          this.tarifDic.push(tarif)
          this.tarif.push(tarif.name)
        }
      })
    })
  }



  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.contractor.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  payerSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.contractor.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  tarifSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.tarif.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  priceSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.price.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  fazSearch: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
  distinctUntilChanged(),
  map(term => term === '' ? []
    : this.fazowoscDic.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
);





  setPriceDic() {
    this.priceService.getAll().subscribe(value => {
      value.PriceList.forEach(price=>{
        if (price.active =="T"){
          this.priceDic.push(price)
          this.price.push(price.name)
        }
      })
    })
  }

  setAdres() {
    this.contractor.forEach(value => {
      if (value === this.numerKlienta){
        this.contracotDic.forEach(contractor=>{
          if (contractor.numerKlienta === this.numerKlienta.split("(")[1].replace(")","")){
            this.ContractorObj = contractor;
            this.adresService.getAdresById(contractor.adres).subscribe(adres=>{
              this.adres=adres.name+" "+adres.post+" "+adres.post_code;
              this.AdresObj = adres;
            })
          }
        })


      }
    })
  }
  validPayer(){
    this.contracotDic.forEach(contractor=>{
      if (contractor.numerKlienta === this.numberPlatnika.split("(")[1].replace(")","")){
        this.PayerObj = contractor;
      }
    })
  }

  validTarif(){
    this.tarifDic.forEach(value => {
      if (value.name == this.taryfa){
        this.TarifObj = value;
      }
    })
  }

  validPrice(){
    this.priceDic.forEach(value => {
      if (value.name == this.cennik){
        this.PriceObj = value;
      }
    })
  }

  save() {
    this.contractorService.save(new ContractItem(
      0,
      "",
      this.ContractorObj.id,
      this.PayerObj.id,
      this.AdresObj.id,
      this.TarifObj.id,
      this.PriceObj.id,
      0,
      this.data,
      this.endDate,
      "",
      this.fazowosc
      )).subscribe(value => console.log(value))
  }
}
