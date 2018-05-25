import { Component } from '@angular/core';
import { Events, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { AuthProvider } from "../../providers/auth/auth";
import { SpotifyProvider } from "../../providers/spotify/spotify";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
              private plt: Platform, private spotify: SpotifyProvider, private events: Events,
              private toastCtrl: ToastController) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus().then((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.events.subscribe("spotify:auth", (authSuccessfully: boolean) => {
            if (!authSuccessfully) {
              let toast = this.toastCtrl.create({
                message: 'Spotify authorization process failed. Please re-try.',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
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
    this.spotify.clientAuth();
  }
}
