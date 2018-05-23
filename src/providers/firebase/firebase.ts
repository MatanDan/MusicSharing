import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from "ionic-angular";

@Injectable()
export class FirebaseProvider {
  private firebaseToken: string;

  constructor(private plt: Platform, private firebase: Firebase) {
  }

  async getToken(): Promise<string> {
    if (this.firebaseToken == null) {
      try {
        if (this.plt.is('ios')) {
          if (!(await this.firebase.hasPermission())) {
            try {
              await this.firebase.grantPermission();
            } catch (error) {
              console.error("Could not get permission to push notifications from iOS: " + error);
            }
          }
        }
        this.firebaseToken = await this.firebase.getToken();
      } catch (error) {
        console.error("Could not get firebase token: " + error);
      }
    }

    console.log("Firebase token: " + this.firebaseToken);
    return this.firebaseToken;
  }

}
