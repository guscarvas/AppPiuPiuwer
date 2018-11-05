import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/do';
import { CadastroPage } from '../cadastro/cadastro';
import { FeedPage } from '../feed/feed';
import { LogInServiceProvider } from '../../providers/login-service/login-service';




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "guscarvas";
  password: string = "ASDFGH"; 

  constructor(public navCtrl: NavController, public navParams: NavParams,private _alertCtrl: AlertController,
    private _loginService: LogInServiceProvider) {
  }

 efetuaLogin(){
   console.log(this.username);
   console.log(this.password);
    
   this._loginService.efetuaLogin(this.username, this.password).subscribe(
     () => {
       this.navCtrl.setRoot(HomePage);
     },
     () =>{
       this._alertCtrl.create({
         title: "Falha no Login!",
         subTitle: "Username e/ou Senha incorretos",
         buttons: [
           {text: "Ok"}
         ]

       }).present();
     })
  
 }
 gotoSignUp(){

  this.navCtrl.push(CadastroPage);
 
}


}
