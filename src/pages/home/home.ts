import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedPage } from '../feed/feed';
import { PerfilPage } from '../perfil/perfil';
import { MeuPerfilPage } from '../meu-perfil/meu-perfil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  Feed = FeedPage;
  Perfil = MeuPerfilPage;

  constructor(public navCtrl: NavController) {


  }

}
