import { Page } from "ionic-angular/navigation/nav-util";
import { NavController } from "ionic-angular";

export class PagesUtils {

  public static async moveAndRemove(navCtrl: NavController, page: Page, params: any = {}) {
    let currentIndex = navCtrl.getActive().index;
    await navCtrl.push(page, params);
    navCtrl.remove(currentIndex);
  }

}
