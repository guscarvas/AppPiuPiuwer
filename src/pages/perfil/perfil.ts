import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Piu } from '../../models/piu';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LogInServiceProvider } from '../../providers/login-service/login-service';
import * as JWT from "jwt-decode";

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
  public numPius: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _userService: UsersServiceProvider,
    private _piuService: PiusServiceProvider,
    private socialSharing: SocialSharing,
    private _loginService: LogInServiceProvider) {
  
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
    this.numPius = this._tempUserfavPius.length + this._tempUserPius.length;

  }

  favorites(piu){
    var temp = JWT(this._loginService.getToken());
    var temp2 = temp.toString();
    if (piu.usuario.id == JWT(this._loginService.getToken())['user_id']){
      this._piuService.favoritesPiu(piu,this._loginService.getToken()).subscribe(
        ()=>{
          this.navCtrl.setRoot(this.navCtrl.getActive().component)
        },
        ()=>{
          console.log("espero q n tenha vindo aqui")
        }
      )
    } 
  }

  unfavorites(piu){
    if (piu.usuario.id == JWT(this._loginService.getToken())['user_id']){
      this._piuService.unfavoritesPiu(piu,this._loginService.getToken()).subscribe(
        ()=>{
          this.navCtrl.setRoot(this.navCtrl.getActive().component)
        },
        ()=>{
          console.log("espero q n tenha vindo aqui")
        }
      )
    }
  }

  shareWhats(content){
    this.socialSharing.shareViaWhatsApp(content, null, null).then(()=>{

      }).catch(()=>{

      });
  }
  

}
