import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PHPData} from "../interfaces/phpdata";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient) { }

  /**
   * envoie un message du frontend au backend
   * @param url à partir de backend/interfaces/
   * @param data données à envoyé au backend
   */
  sendMessage(url : string, data : any) : Observable<PHPData> {
    const trueUrl = environment.DATA_URL.concat(url, ".php");
    // console.log({trueUrl});

    let form = new FormData();
    for (const key in data) {
      form.append(key, data[key])
    }
    return this.http.post<PHPData>(trueUrl, form, {withCredentials: true});
  }
}
