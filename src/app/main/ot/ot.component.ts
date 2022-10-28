import { Component, OnInit } from '@angular/core';
import {KontrahentFormComponent} from "../kontrahent-table/kontrahent-form/kontrahent-form.component";
import {OtFormComponent} from "./ot-form/ot-form.component";

@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.css']
})
export class OtComponent implements OnInit {

  formModule: any = OtFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
