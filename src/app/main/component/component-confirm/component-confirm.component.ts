import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ComponentItem, ComponentService} from "../../../component.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-component-confirm',
  templateUrl: './component-confirm.component.html',
  styleUrls: ['./component-confirm.component.css']
})
export class ComponentConfirmComponent {
  public component: ComponentItem;

  constructor(@Inject(MAT_DIALOG_DATA) data: {component:ComponentItem},private service:ComponentService,private dialog:MatDialog,private taoster:ToastrService) {
    this.component = data.component;
  }

  delete() {
    this.service.delete(this.component).subscribe(
      value => {
        if (value.status == 200){
          this.taoster.success("Pomyslnie usunięto składnik","Sukces",{
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
          this.dialog.closeAll()
        }else{
          this.taoster.error("Podany składnik nie istnieje","Błąd",{
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
        }
      }
    )
  }
}
