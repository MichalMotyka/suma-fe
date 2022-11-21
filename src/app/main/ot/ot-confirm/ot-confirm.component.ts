import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ContractItem} from "../../../contract.service";
import {ot, OtService} from "../../../ot.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ot-confirm',
  templateUrl: './ot-confirm.component.html',
  styleUrls: ['./ot-confirm.component.css']
})
export class OtConfirmComponent implements OnInit {
  ot: ot;
  veryfy:boolean;
  confirm: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:ot,veryfy:boolean,confrim:boolean},private otService:OtService,private taoster:ToastrService,private dialog:MatDialog) {
    this.ot = data.row;
    this.veryfy = data.veryfy;
    this.confirm = data.confrim
  }

  ngOnInit(): void {
  }

  delete() {
    this.otService.delete(this.ot).subscribe(value => {
      if(value.status==202){
        this.taoster.success("Pomyslnie usunięto zlecenie","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Nie można anulować zamkniętego zgłoszenia","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }

  activate(){
    this.otService.veryfication(this.ot).subscribe(value => {
      if(value.status==200){
        this.taoster.success("Pomyslnie przsunięto zlecenie","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Nie udało się przesunąć zlecenia","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }

  edit() {
    this.otService.veryfication(this.ot).subscribe(value => {
      if(value.status==200){
        this.taoster.success("Pomyslnie przsunięto zlecenie","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Nie udało się przesunąć zlecenia","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }
}
