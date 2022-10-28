import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Kontrahent} from "../../../service/kontrahent.service";
import {Price, PriceService} from "../../../price.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-price-confirm',
  templateUrl: './price-confirm.component.html',
  styleUrls: ['./price-confirm.component.css']
})
export class PriceConfirmComponent implements OnInit {

  row: Price;

  constructor(@Inject(MAT_DIALOG_DATA) data: { row: Price }, private priceServeice: PriceService, private taoster: ToastrService, private dialog: MatDialog) {
    this.row = data.row;
  }

  ngOnInit(): void {
  }

  remove() {
    this.priceServeice.delete(this.row).subscribe(value => {
      if (value.status == 202) {
        this.taoster.success("Pomyslnie usunięto cennik", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      } else {
        this.taoster.error("Podany cennik nie istnieje", "Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      }
    })

  }
}
