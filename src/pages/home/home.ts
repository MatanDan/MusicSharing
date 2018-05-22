import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { Platform } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PagesUtils } from "../../utils/pagesUtils";
import { SpotifyUtils } from "../../utils/spotifyUtils";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
              private plt: Platform, private iab: InAppBrowser) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    if (!this.auth.isLoggedIn()) {
      PagesUtils.moveAndRemove(this.navCtrl, LoginPage);
    }
  }

  async authSpotify() {
    SpotifyUtils.clientAuth(this.iab, this.auth.getAccessToken());
  }
}
