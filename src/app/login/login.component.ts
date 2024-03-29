import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {InfoComponent} from "./info/info.component";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CountryCreateResponse} from "../main/administrator/country-list/country-form/country-form.component";
import {map} from "rxjs/operators";
import {UserControllerService} from "../user-controller.service";
import {UserItem} from "../service/users.service";

class User {
  constructor(
    public login: string,
    public password: string
  ) {
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {login: "", password: ""}

  constructor(private http: HttpClient, private dialogRef: MatDialog, private router: Router, private cookieService: CookieService,private usercontroller:UserControllerService) {
  }

  ngOnInit(): void {
  }

  login() {

    if (this.user.login.length < 1 || this.user.password.length < 1) {
      let err = "Hasło lub login nie jest podane proszę sprawdzić dane logowania"
      this.dialogRef.open(InfoComponent,{data:{message:err}});
    } else {
      this.http.post<UserItem>("http://localhost:8080/login", this.user).subscribe(value => {
        this.usercontroller.setUserData(value);
        this.router.navigate(["/main"])
      }, (error: HttpErrorResponse) => {
        let err;
        if (error.status == 401){
          err = "Hasło lub login nie jest prawidłowe"
        }else if (error.status == 409){
          err = "Konto zostało usunięte skontaktuj się z administratorem"
        }

        this.dialogRef.open(InfoComponent,{data:{message:err}});
      })
    }

    //TODO Metoda wysyłająca zapytanie o zalogwanie do aplikacji


  }
}
