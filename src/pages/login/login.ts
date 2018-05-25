import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { TabsPage } from "../tabs/tabs";
import { AuthProvider } from "../../providers/auth/auth";
import { FirebaseProvider} from "../../providers/firebase/firebase";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private toastCtrl: ToastController,
              private auth: AuthProvider, private firebase: FirebaseProvider, private plt: Platform) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus();
    });
  }

  async checkLoginStatus() {
    let isLoggedIn = await this.auth.isLoggedIn();
    if (isLoggedIn) {
      this.moveToTabsPage();
    }
  }

  async login() {
    let isLoggedIn = await this.auth.login();
    if (isLoggedIn) {
      this.moveToTabsPage();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Failed to access facebook servers. Please try again.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  moveToTabsPage() {
    this.firebase.getToken();
    PagesUtils.moveAndRemove(this.navCtrl, TabsPage);
  }

}
