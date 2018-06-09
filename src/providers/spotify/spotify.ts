import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AuthProvider } from "../auth/auth";
import { FirebaseProvider } from "../firebase/firebase";
import { Events } from "ionic-angular";

@Injectable()
export class SpotifyProvider {
  private accessToken: string;

  constructor(private http: HTTP, private iab: InAppBrowser, private auth: AuthProvider,
              private firebase: FirebaseProvider, private events: Events) {
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
      const profile = await this.auth.getProfile();
      const httpResponse = await this.http.post('http://192.168.1.33:8080/clients/spotify', {
        facebookId: profile.id,
        spotifyCode: code
      }, {});
      if (httpResponse.status === 200 && JSON.parse(httpResponse.data).status) {
        this.events.publish('spotify:auth', true);
      }
    } catch (ex) {
      console.error("Failed to exchange spotify code for spotify token: " + JSON.stringify(ex));
      this.events.publish('spotify:auth', false);
    }
  }

}
