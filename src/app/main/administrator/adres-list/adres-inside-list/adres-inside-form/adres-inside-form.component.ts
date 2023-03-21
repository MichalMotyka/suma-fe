import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Adres, AdresService} from "../../../../../service/adres/adres.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../../../../country.service";

@Component({
  selector: 'app-adres-inside-form',
  templateUrl: './adres-inside-form.component.html',
  styleUrls: ['./adres-inside-form.component.css']
})
export class AdresInsideFormComponent implements OnInit {
  private service: AdresService;
   name:string="";
   //gus:string=""
   type:string="";
   post:string="";
   disable = true;
   post_code:string="";
   parent_gus:string="";
  private instance: any;
   viewMode: boolean;
   country;
   formGroup = new FormGroup({
     name: new FormControl('',Validators.required),
     gus: new FormControl('',Validators.required),
     post: new FormControl('',Validators.required),
     type: new FormControl('',Validators.required),
     post_code: new FormControl('',[Validators.required])
   })

  constructor(@Inject(MAT_DIALOG_DATA) data: {adres: any,instance:any,rows:any,viewMode:boolean},private toaster:ToastrService,private dialog:MatDialogRef<any>,service:AdresService,private countryService:CountryService) {
    this.service = service;
    this.parent_gus = data.adres.gus;
    this.instance = data.instance;
    this.viewMode = data.viewMode;
    this.country = data.adres.country
    if (this.viewMode){
      this.formGroup.get('name')?.disable()
      this.formGroup.get('gus')?.disable()
      this.formGroup.get('post')?.disable()
      this.formGroup.get('post_code')?.disable()
      this.formGroup.get('type')?.disable()
      this.name = data.rows.name;
      this.formGroup.get("gus")?.setValue(data.rows.gus)
      //this.gus = data.rows.gus;
      this.type = data.rows.type;
      this.post = data.rows.post;
      this.post_code = data.rows.post_code;
    }
  }

  ngOnInit(): void {
     if (!this.viewMode){
       this.formGroup.get("gus")?.setValue(this.parent_gus)
       this.countryService.getByName(this.country).subscribe(value => {
         this.formGroup.get("gus")?.setValidators([Validators.pattern(value.gusMask),Validators.required])
         this.formGroup.get("post_code")?.setValidators([Validators.pattern(value.postMask),Validators.required])
         this.formGroup.updateValueAndValidity()
       })

     }
  }

  create() {
    this.service.createState(new Adres(0,this.name,<string>this.formGroup.get("gus")?.value,this.type,"T",this.post,this.post_code,"")).subscribe(
      value => {
        if (value.status == 201){
          this.toaster.success("Pomyślnie utworzono obiekt","Sukces",{
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
          this.instance.subscribsion.unsubscribe();
          this.instance.addValue();
          this.dialog.close(this);
        }
      },err=>{
          this.toaster.error("Nie udało się utworzyć obiektu, sprawdz czy nie istnieje już obiekt o tym samym gusie lub nazwie","Błąd",{
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
    }
    )
  }

  validate() {
     this.disable = false;
     let value = <number>this.formGroup.get("gus")?.value?.length;
    if (value < 3){
      this.formGroup.get("gus")?.setValue(this.parent_gus)
    }else if (!this.formGroup.get("gus")?.value?.includes(this.parent_gus)){
      this.formGroup.get("gus")?.setErrors({'invalid':true})
    }
  }
}
