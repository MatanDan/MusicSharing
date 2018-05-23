import { Injectable } from '@angular/core';
import { Facebook } from "@ionic-native/facebook";

@Injectable()
export class AuthProvider {
  private facebookProfile: any;
  private accessToken: string;

  constructor(private facebook: Facebook) {
  }

  getProfile(): any {
    return this.facebookProfile;
  }

  getAccessToken(): Promise<string> {
    return this.facebook.getAccessToken();
  }

  async isLoggedIn(): Promise<boolean> {
    if (this.facebookProfile != null) {
      return true;
    }

    try {
      let loginStatus = await this.facebook.getLoginStatus();
      if (loginStatus.status === 'connected') {
        await this.saveProfileData();
        return true;
      }

      return false;
    } catch(error) {
      console.error("Could not access facebook data: " + error);
      return false;
    }
  }

  async login(): Promise<boolean> {
    try {
      await this.facebook.login(['email', 'public_profile']);
      await this.saveProfileData();
    } catch (error) {
      console.error("Could not login to facebook: " + error);
      return false;
    }
    return true;
  }

  async saveProfileData() {
    this.facebookProfile = await this.facebook.api('me?fields=id,name,email,picture.height(160)', []);
  }

  async logout(): Promise<any> {
    this.accessToken = null;
    this.facebookProfile = null;
    return await this.facebook.logout();
  }

}
