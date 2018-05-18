import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from "@ionic-native/http";
import { LoginPage } from '../pages/login/login';
import { SpotifyUtils } from "../utils/spotifyUtils";
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, http: HTTP) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#ffffff');
      splashScreen.hide();
    });

    window.handleOpenURL = function(url) {
      console.log("!!!!!!!!!!! received url: " + url);
      let code = url.split('code=')[1];
      SpotifyUtils.exchangeCodeForToken(http, code);
    }
  }
}


