import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JWT from "jwt-decode";


@Injectable()
export class LogInServiceProvider {

  public token: string;

  constructor(private _http: HttpClient) {
    
  }
  efetuaLogin(username, password){
    return this._http.post("http://piupiuwer.polijunior.com.br/api/login/",{username, password}).do(
      (answer) =>{
        this.token = answer['token'];
      })
  }

  getToken(){
    return this.token;
  }

  refreshToken(){
    var x = this.token;
    this._http.post("http://piupiuwer.polijunior.com.br/api/token-refresh/",{x}).do(
      (answer)=>{
        this.token = answer['token'];
      }
    )
  }

  

}
