import { Component, ViewChild, OnInit, Renderer, Input, Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable()
export class UpdatesCheckService implements OnInit {

    accordionExapanded = false;
    @ViewChild("cc") cardContent: any;
    @Input('title') title: string;
    @Input('setExpanded') setExpanded: any;
    @Input('image') image: any;
    icon: string = "arrow-forward";

    constructor(private appVersion: AppVersion,
        private http: HTTP,
        public plt: Platform
    ) {
    }

    ngOnInit() {
        this.alertIfRequiredUpdate();
    }

    public alertIfRequiredUpdate(): void {
        let appVersion;
        this.appVersion.getVersionNumber().then(x => {
            appVersion = x;
            let storeVersion: string;
            if (this.plt.is("android")) {
                this.http.get("https://play.google.com/store/apps/details?id=com.moglix.vendor", null, null).then(data => {
                    storeVersion = this.parceVersion(data.data.toString());
                    if (appVersion != storeVersion) {
                        alert("Update required!");
                    }
                });
            }
            if (this.plt.is("ios")) {
                this.http.get("http://itunes.apple.com/lookup?bundleId=com.moglix.vendor", null, null).then(data => {
                    storeVersion = this.parceVersion(data.data.toString());
                    if (appVersion != storeVersion) {
                        alert("Update required!");
                    }
                });
            }
        });
    }

    parceVersion(data: string): string {
        data = data.slice(data.indexOf('Current Version'));
        data = data.slice(data.indexOf('.') - 1, data.indexOf('.') + 4);
        return data;
    }
}