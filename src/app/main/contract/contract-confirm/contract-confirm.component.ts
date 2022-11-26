import {Component, Inject, OnInit} from '@angular/core';
import {ContractItem, ContractService} from "../../../contract.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Kontrahent} from "../../../service/kontrahent.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contract-confirm',
  templateUrl: './contract-confirm.component.html',
  styleUrls: ['./contract-confirm.component.css']
})
export class ContractConfirmComponent implements OnInit {

  contract:ContractItem;
  activate:boolean;
  end: boolean;
  data: any;
  constructor(@Inject(MAT_DIALOG_DATA) data: {row:ContractItem,activate:boolean,end:boolean},private contractServis:ContractService,private taoster:ToastrService,private dialog:MatDialog) {
    this.contract = data.row;
    this.activate = data.activate;
    this.end = data.end
  }

  ngOnInit(): void {
  }

  delete(){
    this.contractServis.deleteByUid(this.contract.uid).subscribe(value => {
      if(value.status==202){
        this.taoster.success("Pomyslnie usunięto umowę","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Podana umowa nie istnieje","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }

  activat(){
    this.contractServis.active(this.contract.id,'').subscribe(value => {
      if(value.status==200){
        this.taoster.success("Pomyslnie aktywowano umowę","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Wystąpił błąd","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }

  endContract(){
    this.contractServis.active(this.contract.id,this.data).subscribe(value => {
      if(value.status==200){
        this.taoster.success("Pomyslnie rozpoczęto poreces zamknięcia umowy","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }else{
        this.taoster.error("Wystąpił błąd","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }

}
