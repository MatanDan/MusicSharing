import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from "@ionic-native/http";
import { LoginPage } from '../pages/login/login';
import { SpotifyUtils } from "../utils/spotifyUtils";
import { timer } from 'rxjs/observable/timer';
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any = LoginPage;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, http: HTTP) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#000000');
      timer(4000).subscribe(() => this.showSplash = false);
      splashScreen.hide();
    });

    window.handleOpenURL = function(url) {
      let code = url.split('code=')[1];
      SpotifyUtils.exchangeCodeForToken(http, code);
    }
  }
}


