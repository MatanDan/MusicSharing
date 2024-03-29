import { Component } from '@angular/core';
import { Events, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { Platform } from 'ionic-angular';
import { PagesUtils } from "../../utils/pagesUtils";
import { AuthProvider } from "../../providers/auth/auth";
import { SpotifyProvider } from "../../providers/spotify/spotify";
import { BroadcastPage } from "../broadcast/broadcast";
import { BroadcastsProvider } from "../../providers/broadcasts/broadcasts";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private authToast: Toast;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider,
              private plt: Platform, private spotify: SpotifyProvider, public events: Events,
              private broadcasts: BroadcastsProvider, private toastCtrl: ToastController) {
    this.plt.ready().then(readySource => {
      this.checkLoginStatus().then(isLoggedIn => {
        if (isLoggedIn) {
          this.events.subscribe('spotify:auth', async (authSuccessfully: boolean) => {
            if (authSuccessfully) {
              if (this.authToast) {
                this.authToast.dismissAll();
              }
              let createdBroadcastId = await this.broadcasts.newBroadcast();
              if (createdBroadcastId) {
                this.navCtrl.push(BroadcastPage, {broadcastId: createdBroadcastId});
                return;
              }
            }
            let failedToast = this.toastCtrl.create({
              message: 'Broadcasting process failed. Please re-try.',
              duration: 4000,
              position: 'bottom'
            });
            failedToast.present();
          });
        }
      });
    });
  }

  async checkLoginStatus(): Promise<boolean> {
    let isLoggedIn = await this.auth.isLoggedIn();
    if (!isLoggedIn) {
      this.plt.exitApp();
    } else {
      // Client is logged in
      let broadcastId = await this.auth.getClientBroadcast();
      if (broadcastId) {
        this.navCtrl.push(BroadcastPage, {broadcastId: broadcastId});
        return;
      }
    }

    return true;
  }

  async newBroadcast() {
    this.authToast = this.toastCtrl.create({
      message: 'Authenticating...',
      duration: 10000,
      position: 'bottom'
    });
    this.authToast.present();

    this.spotify.clientAuth();
  }

}
