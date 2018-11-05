import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import * as JWT from "jwt-decode";

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersServiceProvider {

  public idUser: User;
  public selectedUser: User;

  constructor(private _http: HttpClient) {
    console.log('Hello UsersServiceProvider Provider');
  }

  getUserList(){
    return this._http.get<User[]>("http://piupiuwer.polijunior.com.br/api/usuarios/")
  }

  getUserBasedOnId(id,users): Promise<any>{
    return new Promise((resolve, reject)=>{
      users.forEach(user => {
        if(user.id == id){
          resolve(user);
        }
      }); 
    });
  }

  setSelectedUser(user){
    this.selectedUser = user
  }
  
  favoritesPiu(token, piu){
    if(JWT(token)['user_id'] == piu.usuario){
      piu.favoritado = true;
    }
    return piu.favoritado
  }
}
