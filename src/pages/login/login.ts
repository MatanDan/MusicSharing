import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import { HomePage } from "../home/home";
import { Platform } from 'ionic-angular';
import { SplashScreen } from "@ionic-native/splash-screen";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private splash: SplashScreen, private facebook: Facebook, private plt: Platform) {
    this.plt.ready().then(readySource => {
      this.splash.hide();
      console.log("ready now on login!");
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    let loginStatus = await this.facebook.getLoginStatus();
    if (loginStatus.status === 'connected') {
      this.navCtrl.push(HomePage);
      return;
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
