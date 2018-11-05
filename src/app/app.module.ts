import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {TimeAgoPipe} from 'time-ago-pipe';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { PiusServiceProvider } from '../providers/pius-service/pius-service';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SignupServiceProvider } from '../providers/signup-service/signup-service';
import { PerfilPage } from '../pages/perfil/perfil';
import { FeedPage } from '../pages/feed/feed';
import { LogInServiceProvider } from '../providers/login-service/login-service';
import { UsersServiceProvider } from '../providers/users-service/users-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    FeedPage,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PerfilPage,
    FeedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LogInServiceProvider,
    PiusServiceProvider,
    SignupServiceProvider,
    UsersServiceProvider
  ]
})
export class AppModule {}
