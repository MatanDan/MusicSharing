import { Injectable } from '@angular/core';
import { Facebook } from "@ionic-native/facebook";
import { HTTP } from "@ionic-native/http";
import { FirebaseProvider } from "../firebase/firebase";

@Injectable()
export class AuthProvider {
  private facebookProfile: any;
  private accessToken: string;

  constructor(private facebook: Facebook, private http: HTTP, private firebase: FirebaseProvider) {
  }

  async getProfile(): Promise<any> {
    if(!this.facebookProfile) {
      let facebookLogin = await this.facebook.getLoginStatus();
      if (facebookLogin.status === 'connected') {
        await this.saveProfileData();
      } else {
        return null; // No facebook auth, so no profile exists
      }
    }
    return this.facebookProfile;
  }

  async saveProfileData(): Promise<any> {
    this.facebookProfile = await this.facebook.api('me?fields=id,name,email,picture.height(160)', []);
  }

  getAccessToken(): Promise<string> {
    return this.facebook.getAccessToken();
  }

  async isLoggedIn(): Promise<boolean> {
    const isServerLogged = await this.isServerLoggedIn();
    const profile = await this.getProfile();
    if (profile) {
      if (isServerLogged) {
        return true;
      } else {
        if (!isServerLogged) {
          await this.serverLogin();
        }
        return true;
      }
    }

    return false;
  }

  async login(): Promise<boolean> {
    try {
      await this.facebook.login(['email', 'public_profile']);
      await this.saveProfileData();
      await this.serverLogin();
    } catch (error) {
      console.error("Could not login to facebook: " + error);
      return false;
    }

    return true;
  }

  async isServerLoggedIn(): Promise<boolean> {
    const profile = await this.getProfile();
    if (profile) {
      try {
        const httpResponse = await this.http.get('http://192.168.1.33:8080/clients/isLoggedIn/' + profile.id, {}, {});
        if (httpResponse.status === 200) {
          return JSON.parse(httpResponse.data).isLogged;
        }
      } catch (error) {
        console.error('Failed to get login status from server ' + error);
      }
    }

    return false;
  }

  async getClientBroadcast(): Promise<boolean> {
    const profile = await this.getProfile();
    if (profile) {
      try {
        const httpResponse = await this.http.get('http://192.168.1.33:8080/clients/getBroadcast/' + profile.id, {}, {});
        if (httpResponse.status === 200) {
          return JSON.parse(httpResponse.data).broadcastId;
        }
      } catch (error) {
        console.error('Failed to get broadcastId of client from server ' + error);
      }
    }

    return null;
  }

  // This method throws an exception in case of failure.
  async serverHealthCheck() {
    try {
      const httpResponse = await this.http.get('http://192.168.1.33:8080/general/healthcheck', {}, {});
      if (httpResponse.status !== 200) {
        throw 'Failed to access application\'s server.'
      }
      return true;
    }
    catch (error) {
      console.error('Failed to get server healthcheck: ' + error);
      return false;
    }
  }

  async serverLogin() {
    try {
      const profile = await this.getProfile();
      const httpResponse = await this.http.post('http://192.168.1.33:8080/clients/new', {
        facebookId: profile.id,
        facebookToken: await this.getAccessToken(),
        firebaseToken: await this.firebase.getToken()
      }, {});
    } catch (error) {
      console.error('Failed to login to server ' + error);
    }

  }

  async logout(): Promise<any> {
    this.accessToken = null;
    this.facebookProfile = null;
    return await this.facebook.logout();
  }

}
