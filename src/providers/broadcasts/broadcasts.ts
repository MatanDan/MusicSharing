import { Injectable } from '@angular/core';
import { HTTP } from "@ionic-native/http";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class BroadcastsProvider {

  constructor(private http: HTTP, private auth: AuthProvider) {
  }

  public async newBroadcast(): Promise<number> {
    const profile = await this.auth.getProfile();
    const httpResponse = await this.http.post('http://192.168.1.33:8080/broadcasts/new', {
      broadcasterId: profile.id
    }, {});
    if (httpResponse.status === 200) {
      let data = JSON.parse(httpResponse.data);
      if (data.status) {
        console.log('New broadcastId=' + data.broadcastId);
        return data.broadcastId;
      }
    }

    console.error('Failed to create a new broadcast, conflict with server.');
    return null;
  }

}
