import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PiusServiceProvider } from '../../providers/pius-service/pius-service';
import { Piu } from '../../models/piu';
import { UsersServiceProvider } from '../../providers/users-service/users-service';
import { User } from '../../models/user';
import { PerfilPage } from '../perfil/perfil';
import { LogInServiceProvider } from '../../providers/login-service/login-service';
import * as JWT from "jwt-decode";
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})


export class FeedPage {

  public pius: Piu[];
  public users: User[];
  public clickedUser: User;
  private _content: string = "";
  private _classCounter: string = "";
  private _classInput: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private _piuService: PiusServiceProvider,
    private _userService: UsersServiceProvider,
    private _alertCtrl: AlertController,
    private _loginService: LogInServiceProvider,
    private socialSharing: SocialSharing ) {

      this._piuService.list().subscribe(
        (pius)=>{
          this.pius = pius;
          this._userService.getUserList().subscribe(
            (users)=>{
              this.users = users;
              this.pius.forEach(piu => {
                var favorited = ""
                if(piu.favoritado == true){
                  favorited = "favoritado"
                }
                this.getCreator(piu.usuario).then(usuario =>{
                  piu.usuario = usuario;
                });
              });
            }
          )
        }
      )
      
    }

  getCreator(id){
    return this._userService.getUserBasedOnId(id,this.users);
  }
  
  
  
  goToPerfil(clicked){
    this._userService.setSelectedUser(clicked);
    this.navCtrl.push(PerfilPage);
  }

  updateCounter(){
    if (this._content.length > 140){
      this._classCounter = "error";
      this._classInput = "backgrounderror";
    }
    else{
      this._classCounter = "";
      this._classInput = "";
    }
  }

  checksPiu(){
    if (this._content.length > 140){ 
      this._alertCtrl.create({
        title: "Não foi possivel criar o Piu!",
         subTitle: "O piu não pode ter mais que 140 caracteres",
         buttons: [
           {text: "Ok"}
         ]
      }).present();
      return false;
    }
    else if (this._content.length == 0){
      this._alertCtrl.create({
        title: "Não foi possivel criar o Piu!",
         subTitle: "O piu não pode ser vazio",
         buttons: [
           {text: "Ok"}
         ]
      }).present();
      return false;
    }
    else {
      return true;
    }
  }

  postsPiu(){
    if (this.checksPiu() == false){return;}
    this._piuService.postPiu(this._loginService.getToken(),this._content).subscribe(
      (data)=>{
        this.navCtrl.setRoot(this.navCtrl.getActive().component); //carrega a pg de nv
      },
      ()=>{
        console.log("deu ruim cuzão")
      }
    )
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
