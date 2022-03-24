import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage : string = "";

  login : string = "";
  password : string = "";

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  /**
   * process données recup dans form
   */
  getData() {
    if (this.login && this.password) {
      const login = this.login;
      const password = this.password;

      console.log({login, password});
      this.sendCheckLogin();
    }
    else {
      this.errorMessage = "Login or Password missing."
    }
  }

  /**
   * envoie données dans checkLogin
   */
  sendCheckLogin(){
    this.auth.sendAuthentication(this.login, this.password).subscribe(
      res => {
        this.auth.finalizeAuthentication(res);
        if (this.auth.isConnected) this.router.navigateByUrl('cours');
        else {
          this.errorMessage = res["data"]["reason"];
          console.log("error : ", this.errorMessage);
        }
      }
    );
  }
}
