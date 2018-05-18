import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import { LoginPage } from "../login/login";
import { Platform } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PagesUtils } from "../../utils/pagesUtils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDetails: string;
  facebookAccessToken: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private facebook: Facebook, private plt: Platform, private iab: InAppBrowser) {
    this.plt.ready().then(readySource => {
      console.log("ready now on home!");
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    if (this.navParams.get('profile')) {
      this.userDetails = JSON.stringify(this.navParams.get('profile'));
    } else {
      let loginStatus = await this.facebook.getLoginStatus();
      if (loginStatus.status !== 'connected') {
        PagesUtils.moveAndRemove(this.navCtrl, LoginPage);
        return;
      } else {
        let profile = await this.facebook.api('me?fields=name,email', []);
        this.userDetails = JSON.stringify(profile);
      }
    }

    this.facebookAccessToken = await this.facebook.getAccessToken();
  }

  async logout() {
    await this.facebook.logout();
    PagesUtils.moveAndRemove(this.navCtrl, LoginPage);
  }

  async authSpotify() {
    var scopes = 'user-read-private user-modify-playback-state';
    const browser = this.iab.create('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + 'de7e56c3748b49feaa5ea0aeb46044ba' +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('musicsharing://spotifyCallback'));
    browser.show();
  }
}
