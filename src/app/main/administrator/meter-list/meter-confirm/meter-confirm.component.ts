import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MeterService} from "../../../../meter.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-meter-confirm',
  templateUrl: './meter-confirm.component.html',
  styleUrls: ['./meter-confirm.component.css']
})
export class MeterConfirmComponent implements OnInit {

  id: string;
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: { row: any }, private meterService: MeterService, private toaster: ToastrService, private dialog: MatDialog) {
    this.id = data.row.id;
    this.name = data.row.name;
  }

  ngOnInit(): void {
  }

  delete() {
    this.meterService.remove(this.id).subscribe(value => {
        if (value.status === 200) {
          this.toaster.success("Pomyslnie usunięto województwo z słownika", "Sukces", {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: "decreasing"
          })
          this.dialog.closeAll();
        }
      },err =>{
        this.toaster.error("Nie udało się usunać urządzenia skontaktuj się z administratorem aplikacji", "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
    }
    )
  }
}
