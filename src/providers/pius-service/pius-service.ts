import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Piu } from '../../models/piu';
import * as JWT from "jwt-decode";

/*
  Generated class for the PiusServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PiusServiceProvider {

  constructor(private _http: HttpClient) {
    console.log('Hello PiusServiceProvider Provider');

    
      
  }

  list(){
    return this._http.get<Piu[]>("http://piupiuwer.polijunior.com.br/api/pius");
  }

  postPiu(token,content){
    var id = JWT(token)['user_id'];
    var favorited = false;
    let headers = {
      'Content-Type' : 'application/json',
      'Authorization' : 'JWT ' + token,
    }
    let body = {
      "favoritado": favorited,
      "conteudo":content,
      "usuario":id,
    }
    return this._http.post("http://piupiuwer.polijunior.com.br/api/pius/", body, {headers} );
  }

  favoritesPiu(piu,token){
    let headers = {
      'Content-Type' : 'application/json',
      'Authorization' : 'JWT ' + token,
    }
    return this._http.patch("http://piupiuwer.polijunior.com.br/api/pius/"+piu.id.toString(),{favoritado: true},{headers});
  }
  unfavoritesPiu(piu,token){
    let headers = {
      'Content-Type' : 'application/json',
      'Authorization' : 'JWT ' + token,
    }
    return this._http.patch("http://piupiuwer.polijunior.com.br/api/pius/"+piu.id.toString(),{favoritado: false},{headers});
  }
}
