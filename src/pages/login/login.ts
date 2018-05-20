import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import { HomePage } from "../home/home";
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private facebook: Facebook, private plt: Platform) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    let loginStatus = await this.facebook.getLoginStatus();
    if (loginStatus.status === 'connected') {
      PagesUtils.moveAndRemove(this.navCtrl, HomePage);
    }
  }

  async loginWithFacebook() {
    try {
      await this.facebook.login(['email', 'public_profile']);
      let profile = await this.facebook.api('me?fields=name,email', []);
      PagesUtils.moveAndRemove(this.navCtrl, HomePage, {profile: profile});
    } catch (error) {
      console.log(error);
    }
  }
}
