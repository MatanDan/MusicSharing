import { Component } from '@angular/core';
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'profile',
  templateUrl: 'profile.cmp.html'
})
export class ProfileComponent {
  private profilePhoto: string;
  private username: string
  private id: string;

  constructor(private auth: AuthProvider) {
  }

  async ngOnInit() {
    const profile = await this.auth.getProfile();
    this.profilePhoto = profile.picture.data.url;
    this.username = profile.name;
    this.id = profile.id;
  }

}
