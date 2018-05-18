import { HTTP } from '@ionic-native/http';
import {InAppBrowser} from "@ionic-native/in-app-browser";

export class SpotifyUtils {

  public static clientAuth(iab: InAppBrowser) {
    var scopes = 'user-read-private user-modify-playback-state';
    let URL = 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + 'de7e56c3748b49feaa5ea0aeb46044ba' +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('musicsharing://spotifyCallback');
    iab.create(URL, '_system');
  }

  public static async exchangeCodeForToken(http: HTTP, code: string) {
    try {
      const httpResponse = await http.post('http://192.168.1.26:8080/newClient', {
        facebookToken: 'a',
        spotifyCode: code
      }, {});
      console.log(httpResponse.data);
    } catch (ex) {
      console.log("failed: " + ex);
    }
  }

}
