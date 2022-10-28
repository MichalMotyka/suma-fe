import { Component, OnInit } from '@angular/core';
import {ComponentFormComponent} from "../component/component-form/component-form.component";
import {ContractFormComponent} from "./contract-form/contract-form.component";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  formModule: any = ContractFormComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
