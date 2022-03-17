import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage : string = "";

  login : string = "";
  password : string = "";

  constructor(private message : MessageService, private router : Router) { }

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
    this.message.sendMessage("checkLogin", {password : this.password, login : this.login}).subscribe(
      res => {
        console.log({res});
        if (res["status"] === "error") {
          console.log("error");
          this.errorMessage = res["data"]["reason"];
          console.log(this.errorMessage);
        }
        else this.router.navigateByUrl('cours');
      }
    );
  }
}
