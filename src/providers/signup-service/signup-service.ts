import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the SignupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupServiceProvider {

  public createdUser;

  constructor(private _http: HttpClient) {
    console.log('Hello SignupServiceProvider Provider');
  }

  SingUp(username, password, first_name, last_name, email){
    return this._http.post("http://piupiuwer.polijunior.com.br/api/usuarios/registrar/",{username, password, first_name, last_name, email}).do(
      (createdUser) => {
        this.createdUser = createdUser;

      }

    );

  }
}


