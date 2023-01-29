import {Component, Inject, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Adres, AdresService} from "../../../../../service/adres/adres.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-adres-inside-form',
  templateUrl: './adres-inside-form.component.html',
  styleUrls: ['./adres-inside-form.component.css']
})
export class AdresInsideFormComponent implements OnInit {
  private service: AdresService;
   name:string="";
   gus:string=""
   type:string="";
   post:string="";
   post_code:string="";
   parent_gus:string="";
  private instance: any;
   viewMode: boolean;
   formGroup = new FormGroup({
     name: new FormControl('',Validators.required),
     gus: new FormControl('',Validators.required),
     post: new FormControl('',Validators.required),
     type: new FormControl('',Validators.required),
     post_code: new FormControl('',[Validators.required,Validators.pattern('00-000')])
   })

  constructor(@Inject(MAT_DIALOG_DATA) data: {adres: any,instance:any,rows:any,viewMode:boolean},private toaster:ToastrService,private dialog:MatDialogRef<any>,service:AdresService) {
    this.service = service;
    this.parent_gus = data.adres.gus;
    this.instance = data.instance;
    this.viewMode = data.viewMode;
    if (this.viewMode){
      this.formGroup.get('name')?.disable()
      this.formGroup.get('gus')?.disable()
      this.formGroup.get('post')?.disable()
      this.formGroup.get('post_code')?.disable()
      this.formGroup.get('type')?.disable()
      this.name = data.rows.name;
      this.gus = data.rows.gus;
      this.type = data.rows.type;
      this.post = data.rows.post;
      this.post_code = data.rows.post_code;
    }
  }

  ngOnInit(): void {
  }

  create() {
    this.service.createState(new Adres(0,this.name,this.parent_gus.substring(0,2)+this.gus,this.type,"T",this.post,this.post_code)).subscribe(
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
        }else{
          this.toaster.error("Nie udało się utworzyć obiektu","Błąd",{
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
        }
      }
    )
  }
}
