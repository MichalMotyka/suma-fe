import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {InfoComponent} from "./info/info.component";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

class User {
  constructor(
    public login:string,
    public password:string
  ) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User ={login:"",password:""}
  @Input() message: string = ""
  constructor(private http: HttpClient,private dialogRef: MatDialog,private router:Router,private cookieService: CookieService ) { }

  ngOnInit(): void {
  }

  login(){
    this.http.post<User>("http://localhost:8080/login",this.user).subscribe()
    if (this.user.login.length < 1 || this.user.password.length < 1){
      this.message = "Hasło lub login nie jest podane proszę sprawdzić dane logowania"
      this.dialogRef.open(InfoComponent);
    }
    else {
      this.router.navigate(["/main"])
    }
    //TODO Metoda wysyłająca zapytanie o zalogwanie do aplikacji
  }


}
