import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { TabsPage } from "../tabs/tabs";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController,
              private auth: AuthProvider, private plt: Platform) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    let isLoggedIn = await this.auth.isLoggedIn();
    if (isLoggedIn) {
      PagesUtils.moveAndRemove(this.navCtrl, TabsPage);
    }
  }

  async login() {
    let isLoggedIn = await this.auth.login();
    if (isLoggedIn) {
      PagesUtils.moveAndRemove(this.navCtrl, TabsPage);
    } else {
      this.toastCtrl.create({
        message: 'Failed to access facebook servers. Please try again.',
        duration: 2500,
        position: 'middle'
      });
    }
  }

}
