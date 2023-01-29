import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ComponentItem, ComponentService} from "../../../component.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.css']
})
export class ComponentFormComponent implements OnInit {
  viewMode: boolean = false;
  name!: string;
  type: any;
  formGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required)
  })
  animals: ComponentItem[] = [
    {id:0,name: 'Zużyciowy', typ: '',active:""},
    {id:0,name: 'Oddanie', typ: '',active:""},
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data: {component:ComponentItem,viewMode:boolean},private componentService:ComponentService,private toaster:ToastrService,private dialog:MatDialogRef<any>) {
    if (data.viewMode){
      this.formGroup.get('name')?.disable()
      this.formGroup.get('type')?.disable()
      this.viewMode = data.viewMode
      this.name = data.component.name
      this.type = data.component.typ
    }
  }

  ngOnInit(): void {
  }

  create() {
    let data:ComponentItem = new ComponentItem(0,this.name,this.type.name,"T");
      this.componentService.save(data).subscribe(
          value => {
            if (value.status == 201){
              this.toaster.success("Pomyślnie utworzono składnik","Sukces", {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: "decreasing"
              })
              this.dialog.close(this);
          }else{
              this.toaster.error("Nie udało się utworzyć składnika","Błąd", {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: "decreasing"
              })
            }
          }
      )
  }
}
