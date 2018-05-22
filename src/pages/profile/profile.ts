import { Component } from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {PagesUtils} from "../../utils/pagesUtils";
import {LoginPage} from "../login/login";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private auth: AuthProvider) {
  }

  async logout() {
    let isLoggedOut = await this.auth.logout();
    if (isLoggedOut) {
      PagesUtils.moveAndRemove(this.app.getRootNav(), LoginPage);
    }
  }

}
