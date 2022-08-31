import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {KontrahentTableComponent} from "../kontrahent-table/kontrahent-table.component";

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css']
})
export class UtilsComponent implements OnInit {

  @Input() module!:any
  constructor(private dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  add() {
    this.dialogRef.open(this.module)
  }
}
