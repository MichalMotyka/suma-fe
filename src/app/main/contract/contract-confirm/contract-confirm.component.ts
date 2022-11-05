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

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:ContractItem},private contractServis:ContractService,private taoster:ToastrService,private dialog:MatDialog) {
    this.contract = data.row;
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

}
