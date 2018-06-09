import { Component } from '@angular/core';
import { AlertController, NavController, ToastController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { TabsPage } from "../tabs/tabs";
import { AuthProvider } from "../../providers/auth/auth";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import { Network } from "@ionic-native/network";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController, private toastCtrl: ToastController,
              private auth: AuthProvider, private firebase: FirebaseProvider,
              private plt: Platform, private network: Network, private alertCtrl: AlertController) {
    this.plt.ready().then(async readySource =>  {
      // Valid network connection
      if (this.network.type === 'none' || !await this.auth.serverHealthCheck()) {
        this.offlineAlert();
      } else {
        this.checkLoginStatus();
      }
    });
  }

  async offlineAlert() {
    let confirm = this.alertCtrl.create({
      title: 'Check your internet connection',
      message: 'We have failed to access internet services. Please re-launch the application when internet is available again.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Exit',
          handler: () => {
            this.plt.exitApp();
          }
        }
      ]
    });
    confirm.present();
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
      let failedToast = this.toastCtrl.create({
        message: 'Failed to access servers. Please try again.',
        duration: 3000,
        position: 'bottom'
      });
      failedToast.present();
    }
  }

  moveToTabsPage() {
    PagesUtils.moveAndRemove(this.navCtrl, TabsPage);
  }

}
