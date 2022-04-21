import { Injectable } from '@angular/core';
import {MessageService} from "../message/message.service";
import {Observable} from "rxjs";
import {PHPData} from "../interfaces/phpdata";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isConnected: boolean = true;

  constructor(private message: MessageService) { }

  /***
   * fonction envoyant au backend login et password pour athentification
   * renvoie resultat
   * @param login
   * @param password
   */
  sendAuthentication(login: string, password: string): Observable<PHPData> {
    return this.message.sendMessage("checkLogin", {password : password, login : login})
  }

  /***
   * selon une phpData dis si bien authentifier
   * @param data
   */
  finalizeAuthentication(data: PHPData): void {
    this.isConnected = (data["status"] === "ok");
  }
}
