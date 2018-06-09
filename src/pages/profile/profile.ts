import { Component } from '@angular/core';
import { App, NavController, NavParams, ToastController } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { LoginPage } from "../login/login";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App,
              private toastCtrl: ToastController, private auth: AuthProvider) {
  }

  async logout() {
    let isLoggedOut = await this.auth.logout();
    if (isLoggedOut) {
      this.toastCtrl.create({
        message: 'Logged out of facebook.',
        duration: 1500,
        position: 'middle'
      });
      PagesUtils.moveAndRemove(this.app.getRootNav(), LoginPage);
    }
  }

}
