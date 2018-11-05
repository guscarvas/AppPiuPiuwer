import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Piu } from '../../models/piu';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  private _pius: Piu[];
  private _tempUserPius: Piu[] = [];
  private _tempUserfavPius: Piu[] = [];
  private _tempUser: User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _userService: UsersServiceProvider,
    private _piuService: PiusServiceProvider) {
  
      this._tempUser = this._userService.selectedUser;
      console.log("passei aqui começo de td");
      this._piuService.list().subscribe(
        (pius)=>{
          this._pius = pius;
          console.log(this._pius);
          this.selectsPius()
        }
      )

  }

  selectsPius(){
    console.log("começo selects pius");
    this._pius.forEach(piu => {
      if(piu.usuario.id == this._tempUser.id){
        if(piu.favoritado == true){
          this._tempUserfavPius.push(piu);
        }
        else{
          this._tempUserPius.push(piu);
        }
      }
    });
  }
  

}
