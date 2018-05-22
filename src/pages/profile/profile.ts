import { Component } from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import { Facebook } from "@ionic-native/facebook";
import {PagesUtils} from "../../utils/pagesUtils";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private facebook: Facebook) {
  }

  async logout() {
    await this.facebook.logout();
    PagesUtils.moveAndRemove(this.app.getRootNav(), LoginPage);
  }

}
