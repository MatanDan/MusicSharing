import { Component } from '@angular/core';
import { NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'page-broadcast',
  templateUrl: 'broadcast.html',
})
export class BroadcastPage {
  private leavingToast: Toast;
  private isLeaving: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    let broadcastToast = this.toastCtrl.create({
      message: 'Starting a broadcast!',
      duration: 2000,
      position: 'bottom'
    });
    broadcastToast.present();
  }

  ionViewCanLeave() {
    if (this.isLeaving) {
      this.leavingToast.dismissAll();
      this.isLeaving = false;

      this.leaveBroadcast();
      return true;
    }

    this.leavingToast = this.toastCtrl.create({
      message: 'Going back will leave the broadcast, please reclick back if you wish to do so.',
      duration: 4000,
      position: 'bottom'
    });
    this.leavingToast.present();
    this.isLeaving = true;
    timer(4000).subscribe(() => this.isLeaving = false);
    return false;
  }

  private leaveBroadcast() {

  }
}
