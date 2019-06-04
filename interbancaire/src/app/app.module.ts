import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AndroidPermissions,
    Contacts,
    HTTP,
    Platform,
    AppVersion
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
