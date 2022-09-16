import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import {Kontrahent, KontrahentService} from "../../../service/kontrahent.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-kontrahent-confirm',
  templateUrl: './kontrahent-confirm.component.html',
  styleUrls: ['./kontrahent-confirm.component.css']
})
export class KontrahentConfirmComponent implements OnInit {

  nazwa: string;
  id: number;
  subscryption!: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) data: {row:Kontrahent},private kontrahentService:KontrahentService,private dialog:MatDialogRef<any>,private taoster:ToastrService) {
    this.nazwa = data.row.nazwa;
    this.id = data.row.id
  }

  ngOnInit(): void {
  }

  delete() {
    this.subscryption = this.kontrahentService.remove(this.id).subscribe(value => {
        if(value.status==202){
            this.taoster.success("Pomyslnie usunięto kontrahenta","Sukces",{
              timeOut: 3000,
              progressBar: true,
              progressAnimation: "decreasing"
            })
            this.dialog.close(this)
        }else{
          this.taoster.error("Podany kontrahent nie istnieje","Błąd",{
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
        }
    })
  }
}
