import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ContractList} from "../../../contract.service";
import {Subscription} from "rxjs";
import {Roles, User, UserItem, UsersService} from "../../../service/users.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

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
  id!:string;
  constructor( @Inject(MAT_DIALOG_DATA) data: {row:User,viewMode: boolean,editMode:boolean},private userService:UsersService, private toaster:ToastrService, private dialog:MatDialog) {
    if (data.editMode || data.viewMode){
      this.id = data.row.id
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
    if (!this.editMode && !this.viewMode){
      this.addValue();
    }
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
    this.userService.createUser(new UserItem("",this.login,this.password,this.rola,this.dataSource._data._value)).subscribe(value => {
      if (value.status == 200){
        this.toaster.success("Pomyślnie utworzono użytkownika","Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"})
        this.dialog.closeAll();
      }
    },error => {
      this.toaster.error("Nie udało się utworzyć użytkownika, już istnieje o takiej nazwie","Błąd", {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: "decreasing"
      })
    })
  }

  update(){
    this.userService.upateUser(new UserItem(this.id,this.login,this.password,this.rola,this.dataSource._data._value)).subscribe(value => {
      if (value.status == 200) {
        this.toaster.success("Pomyślnie zaktulizowano użytkownika", "Sukces", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
        this.dialog.closeAll();
      }
      },error => {
        this.toaster.error("Nie udało się zaktulizować użytkownika","Błąd", {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: "decreasing"
        })
      })
  }

  updateActivation(row:Roles) {
    row.active = !row.active
  }
}
