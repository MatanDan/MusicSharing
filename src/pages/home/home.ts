import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import { LoginPage } from "../login/login";
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDetails: string;
  facebookAccessToken: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook, private plt: Platform) {
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
        this.navCtrl.push(LoginPage);
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
    this.navCtrl.push(LoginPage);
  }

}
