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

  ngOnInit() {
    this.profilePhoto = this.auth.getProfile().picture.data.url;
    this.username = this.auth.getProfile().name;
    this.id = this.auth.getProfile().id;
  }

}
