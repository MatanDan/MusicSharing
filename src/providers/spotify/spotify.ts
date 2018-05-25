import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AuthProvider } from "../auth/auth";
import { FirebaseProvider } from "../firebase/firebase";

@Injectable()
export class SpotifyProvider {

  constructor(private http: HTTP, private iab: InAppBrowser, private auth: AuthProvider, private firebase: FirebaseProvider) {
  }

  public clientAuth() {
    var scopes = 'user-read-private user-read-email user-read-birthdate user-modify-playback-state';
    let URL = 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + 'de7e56c3748b49feaa5ea0aeb46044ba' +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('musicsharing://spotifyCallback');
    this.iab.create(URL, '_system');
  }

  public async exchangeCodeForToken(code: string) {
    try {
      const httpResponse = await this.http.post('http://192.168.1.26:8080/newClient', {
        facebookId: this.auth.getProfile().id,
        facebookToken: await this.auth.getAccessToken(),
        firebaseToken: await this.firebase.getToken(),
        spotifyCode: code
      }, {});
      console.log(httpResponse.data);
    } catch (ex) {
      console.error("Failed to exchange spotify code for spotify token: " + JSON.stringify(ex));
    }
  }


}
