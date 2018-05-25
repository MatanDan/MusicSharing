import { Component } from '@angular/core';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from "@ionic-native/http";
import { SpotifyProvider } from "../providers/spotify/spotify";
import { LoginPage } from '../pages/login/login';
import { timer } from 'rxjs/observable/timer';
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any = LoginPage;
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, http: HTTP,
              spotify: SpotifyProvider, events: Events) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#000000');
      timer(1500).subscribe(() => this.showSplash = false);
      splashScreen.hide();
    });

    window.handleOpenURL = function(url) {
      if (url.includes('error=')) {
        events.publish('spotify:auth', false);
      } else {
        let code = url.split('code=')[1];
        spotify.exchangeCodeForToken(code);
      }
    }
  }

}


