import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ContractList} from "../../contract.service";
import {OtFormComponent} from "../ot/ot-form/ot-form.component";
import {Subscription} from "rxjs";
import {OtService} from "../../ot.service";
import {MatDialog} from "@angular/material/dialog";
import {User, UsersService} from "../../service/users.service";
import {UserFormComponent} from "./user-form/user-form.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ContractList>;
  dataSource:any;
  formModule: any = UserFormComponent;
  displayedColumns = ['id', 'name','actions'];
  private subcription!: Subscription;
  constructor(private userService:UsersService,private dialog:MatDialog) {
    dialog.afterAllClosed.subscribe(value => {
      this.subcription.unsubscribe;
      this.addValue()
    })
  }

  ngOnInit(): void {
    this.addValue();
  }

  addValue(){
    this.subcription = this.userService.getAllUsers().subscribe({
      next: value => {
        this.dataSource = new MatTableDataSource(value.userList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }


  edit(row:any) {
    this.dialog.open(UserFormComponent,{data:{row:row,viewMode:false,editMode:false}})
  }

  view(row:any) {
    this.dialog.open(UserFormComponent,{data:{row:row,viewMode:true,editMode:false}})
  }

  remove(row:any) {

  }
}
