import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupServiceProvider } from '../../providers/signup-service/signup-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _signupservice: SignupServiceProvider, private _alertCtrl: AlertController ) {
  }

  SignUp(){
    this._signupservice.SingUp(this.username, this.password, this.first_name, this.last_name, this.email).subscribe(
      ()=>{
        this._alertCtrl.create({
          title: "Seu Cadastro foi realizado com sucesso!",
          subTitle: "Você já pode realizar o Log In normalmente",
          buttons: [
           {
             text: "Ok",
             handler: () =>{
               this.navCtrl.setRoot(LoginPage);
             }
            }
          ]
        }).present()
        
      },
      ()=>{
        this._alertCtrl.create({
          title: "Falha no Cadastro!",
          subTitle: "Tente novamente mais tarde",
          buttons: [
           {text: "Ok"}
          ]
        }).present();
      }
    )

  }  



}
