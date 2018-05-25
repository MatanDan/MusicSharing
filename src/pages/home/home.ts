import { Component } from '@angular/core';
import { Events, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { AuthProvider } from "../../providers/auth/auth";
import { SpotifyProvider } from "../../providers/spotify/spotify";
import { BroadcastPage } from "../broadcast/broadcast";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private authToast: Toast;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
              private plt: Platform, private spotify: SpotifyProvider, private events: Events,
              private toastCtrl: ToastController) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus().then((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.events.subscribe("spotify:auth", (authSuccessfully: boolean) => {
            if (authSuccessfully) {
              this.authToast.dismissAll();
              this.navCtrl.push(BroadcastPage);
            } else {
              let failedToast = this.toastCtrl.create({
                message: 'Spotify authorization process failed. Please re-try.',
                duration: 3000,
                position: 'bottom'
              });
              failedToast.present();
            }
          });
        }
      });
    });
  }

  async checkLoginStatus(): Promise<boolean> {
    let isLoggedIn = await this.auth.isLoggedIn();
    if (!isLoggedIn) {
      PagesUtils.moveAndRemove(this.navCtrl, LoginPage);
      return false;
    }

    return true;
  }

  async newBroadcast() {
    this.authToast = this.toastCtrl.create({
      message: 'Authenticating...',
      duration: 10000,
      position: 'bottom'
    });
    this.authToast.present();
    this.spotify.clientAuth();
  }
}
