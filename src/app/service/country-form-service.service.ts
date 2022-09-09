import { Injectable } from '@angular/core';
import {CountryItem} from "../country.service";

@Injectable({
  providedIn: 'root'
})
export class CountryFormServiceService {

  constructor() { }
  currRow!:CountryItem;

  setCurrRow(row: CountryItem){
    this.currRow = row;
  }
  getCurrRow(): CountryItem{
    return this.currRow;
  }
}
