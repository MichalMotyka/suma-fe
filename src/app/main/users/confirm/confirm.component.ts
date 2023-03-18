import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Kontrahent} from "../../../service/kontrahent.service";
import {User, UsersService} from "../../../service/users.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  user:User;
  constructor(@Inject(MAT_DIALOG_DATA) data: {row:User},private userSerive:UsersService,private taoster:ToastrService,private dialog:MatDialog) {
    this.user = data.row
  }

  ngOnInit(): void {
  }

  delete() {
    this.userSerive.delete(this.user).subscribe(value => {
      if(value.status==202){
        this.taoster.success("Pomyslnie usunięto konto","Sukces",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll()
      }else{
        this.taoster.error("Podane konto nie istnieje","Błąd",{
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })
  }
}
