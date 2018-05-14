import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userDetails: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebook: Facebook) {

  }

  async ionViewDidEnter() {
    if (this.navParams.get('profile')) {
      this.userDetails = JSON.stringify(this.navParams.get('profile'));
    } else {
      let loginStatus = await this.facebook.getLoginStatus();
      if (loginStatus.status !== 'connected') {
        this.navCtrl.push(LoginPage);
      } else {
        let profile = await this.facebook.api('me?fields=name,email', []);
        this.userDetails = JSON.stringify(profile);
      }
    }
  }

  logout() {
    this.facebook.logout();
    this.navCtrl.push(LoginPage);
  }

}
