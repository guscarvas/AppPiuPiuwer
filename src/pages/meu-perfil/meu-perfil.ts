import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { Piu } from '../../models/piu';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LogInServiceProvider } from '../../providers/login-service/login-service';
import * as JWT from "jwt-decode";


/**
 * Eu sei que ta td copiado e colado do perfil page mas tava ficando muito tarde e eu n posso perder muito mais tempo nisso
 * Peço desculpas, sei que o correto n~eo é ter tanto codigo copiado como aqui, mas era o jeito mais rapido
 */

@IonicPage()
@Component({
  selector: 'page-meu-perfil',
  templateUrl: 'meu-perfil.html',
})
export class MeuPerfilPage {

  private _pius: Piu[];
  private _tempUserPius: Piu[] = [];
  private _tempUserfavPius: Piu[] = [];
  private _tempUser: User = {
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    foto_perfil: null
};
  public numPius: number;
  private JwtUser;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _userService: UsersServiceProvider,
    private _piuService: PiusServiceProvider,
    private socialSharing: SocialSharing,
    private _loginService: LogInServiceProvider,
    public toastCtrl: ToastController) {

      this.JwtUser = JWT(this._loginService.getToken());
      this._tempUser.id = this.JwtUser['user_id'];
      console.log(this._tempUser.id);
      this._tempUser.username = this.JwtUser['username']
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
    if (piu.usuario.id == JWT(this._loginService.getToken())['user_id']){
      this._piuService.favoritesPiu(piu,this._loginService.getToken()).subscribe(
        ()=>{
          this.navCtrl.setRoot(this.navCtrl.getActive().component)
        },
        ()=>{
          console.log("espero q n tenha vindo aqui")
        })
    }
    else{
        const toast = this.toastCtrl.create({
          message: 'Você só pode favoritar pius de sua autoria!',
          duration: 3000
        });
        toast.present();
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
        })
    }
    else{
      const toast = this.toastCtrl.create({
        message: 'Você só pode desfavoritar pius de sua autoria!',
        duration: 3000
      });
      toast.present();
    }
  }

  shareWhats(content){
    this.socialSharing.shareViaWhatsApp(content, null, null).then(()=>{

      }).catch(()=>{

      });
  }
  doRefresh(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component)
  }
}
