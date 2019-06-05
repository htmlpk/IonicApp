import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import {IONIC_DIRECTIVES, ionicProviders} from 'ionic-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})
export class AppComponent {
  public ready: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions
  ) {
    //this.initializeApp();
    this.chechPermissions().then(
      () => {
        this.initializeApp();
      }
    );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.ready = true;
    });
  }
  public chechPermissions(): Promise<void> {
    return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(
      err => { return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CONTACTS) }
    );
  }
}

