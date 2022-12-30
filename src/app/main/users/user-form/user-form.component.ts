import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ContractList} from "../../../contract.service";
import {Subscription} from "rxjs";
import {Roles, User, UserItem, UsersService} from "../../../service/users.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  login: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ContractList>;
  dataSource:any;
  displayedColumns = ['id', 'name'];
  private subcription!: Subscription;
  viewMode:boolean = false;
  editMode:boolean = false;
  rola!: string;
  password!: string;
  constructor( @Inject(MAT_DIALOG_DATA) data: {row:User,viewMode: boolean,editMode:boolean},private userService:UsersService) {
    if (data.editMode || data.viewMode){
      this.login = data.row.name;
      this.rola = data.row.role;
      this.viewMode = data.viewMode;
      this.editMode = data.editMode;
      this.userService.getActiveRoles(data.row.id).subscribe(value => {
        this.dataSource = new MatTableDataSource(value.rolesList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    }
  }

  ngOnInit(): void {
    this.addValue();
  }
  addValue(){
    this.subcription = this.userService.getAllRoles().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.rolesList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  save() {
    this.userService.createUser(new UserItem(0,this.login,this.rola,this.password,this.dataSource._data._value)).subscribe(value => {
      console.log(this.dataSource.value)
    },error => {
      console.log(this.dataSource._data._value)
    })
  }

  updateActivation(row:Roles) {
    row.active = !row.active
    console.log(this.dataSource._data._value)
  }
}
