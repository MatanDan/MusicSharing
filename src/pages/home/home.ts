import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
              private plt: Platform, private spotify: SpotifyProvider) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    if (!this.auth.isLoggedIn()) {
      PagesUtils.moveAndRemove(this.navCtrl, LoginPage);
    }
  }

  async newBroadcast() {
    this.spotify.clientAuth();
  }
}
