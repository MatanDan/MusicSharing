import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook) {
  }

  async ionViewDidLoad() {
    let loginStatus = await this.facebook.getLoginStatus();
    if (loginStatus.status === 'connected') {
      this.navCtrl.push(HomePage);
    }
  }

  async loginWithFacebook() {
    try {
      await this.facebook.login(['email', 'public_profile']);
      let profile = await this.facebook.api('me?fields=name,email', []);
      this.navCtrl.push(HomePage, {profile: profile});
    } catch (error) {
      console.log(error);
    }
  }

}
