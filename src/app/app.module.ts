import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from "@ionic-native/facebook";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HTTP } from '@ionic-native/http';
import { Firebase } from "@ionic-native/firebase";
import { Network } from "@ionic-native/network";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { ProfilePage } from "../pages/profile/profile";
import { AboutPage } from "../pages/about/about";
import { BroadcastPage } from "../pages/broadcast/broadcast";

import { ProfileComponent } from "../components/profile/profile.cmp";
import { BroadcastComponent } from "../components/broadcast/broadcast.cmp";

import { AuthProvider } from '../providers/auth/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { SpotifyProvider } from '../providers/spotify/spotify';
import { BroadcastsProvider } from '../providers/broadcasts/broadcasts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ProfilePage,
    AboutPage,
    BroadcastPage,
    ProfileComponent,
    BroadcastComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ProfilePage,
    AboutPage,
    BroadcastPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    InAppBrowser,
    HTTP,
    Firebase,
    Network,
    AuthProvider,
    FirebaseProvider,
    SpotifyProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BroadcastsProvider
  ]
})
export class AppModule {}
