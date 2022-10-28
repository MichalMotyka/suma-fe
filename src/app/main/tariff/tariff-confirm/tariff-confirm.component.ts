import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Tariff, TariffService} from "../../../tariff.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tariff-confirm',
  templateUrl: './tariff-confirm.component.html',
  styleUrls: ['./tariff-confirm.component.css']
})
export class TariffConfirmComponent implements OnInit {

  tarif:Tariff;
  constructor(@Inject(MAT_DIALOG_DATA) data: {component:Tariff},private tariffSerive:TariffService,private taoster:ToastrService,private dialog:MatDialog) {
    this.tarif = data.component;

  }

  ngOnInit(): void {
  }

  delete() {
    this.tariffSerive.drop(this.tarif).subscribe(value => {
      if(value.status==200){
        this.taoster.success("Pomyslnie usunięto taryfe","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Podana taryfa nie istnieje","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }
}
