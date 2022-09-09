import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CountryService} from "../../../../country.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-adres-remove',
  templateUrl: './adres-remove.component.html',
  styleUrls: ['./adres-remove.component.css']
})
export class AdresRemoveComponent implements OnInit {
  value:any;
  service:any;
  constructor(@Inject(MAT_DIALOG_DATA) data: {rows:any,service:any},private dialog:MatDialogRef<AdresRemoveComponent>,private toaster:ToastrService) {
    this.service = data.service;
    this.value = data.rows
  }

  ngOnInit(): void {
  }

  delete() {

    // @ts-ignore
    this.service.delete(this.value).subscribe(value1=>{
      if(value1.status == 202){
        this.toaster.success("Pomyslnie usunięto województwo z słownika","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.close();
      }else{
        this.toaster.error("Nie udało się usunąć województwa, wartość nie istnieje","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
    // this.dialog.closeAll();
  }
}
