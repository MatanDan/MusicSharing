import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  broadcastRoot = HomePage;
  profileRoot = ProfilePage;
  aboutRoot = HomePage;

  constructor(public navCtrl: NavController) {}

}
