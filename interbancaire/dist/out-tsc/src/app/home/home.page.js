import * as tslib_1 from "tslib";
import { NavController } from '@ionic/angular';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DomSanitizer } from '@angular/platform-browser';
// import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';
var HomePage = /** @class */ (function () {
    function HomePage(androidPermissions, navCtrl, contacts, sanitizer) {
        var _this = this;
        this.androidPermissions = androidPermissions;
        this.navCtrl = navCtrl;
        this.contacts = contacts;
        this.sanitizer = sanitizer;
        this.allContacts = [];
        this.contactType = ["displayName"];
        this.alphabetContacts = [];
        this.win = window;
        this.getFiltered = function (q) {
            var option = {
                filter: q,
                hasPhoneNumber: true,
            };
            _this.contacts.find(['displayName', , 'phoneNumbers'], option)
                .then(function (data) {
                _this.allContacts = data
                    .map(function (y) {
                    if (y.photos) {
                        /y["image"] = this.sanitizer.bypassSecurityTrustUrl(y.photos[0].value);;
                        y["image"] = _this.win.Ionic.WebView.convertFileSrc(y.photos[0].value);
                        return y;
                    }
                });
                // .map(x => {
                //   let isNumbersExist = x.phoneNumbers.filter(n =>
                //     n.value.startsWith("06")
                //     || n.value.startsWith("07")
                //     || n.value.startsWith("+337")
                //     || n.value.startsWith("+336")
                //     || n.value.startsWith("44")
                //   )
                //   if (isNumbersExist.length > 0 && x.displayName) {
                //     x.phoneNumbers = isNumbersExist;
                //     if(x.photos){
                //       x.photo = this.sanitizer.bypassSecurityTrustUrl(x.photos[0].value);
                //     }
                //     return x
                //   }
                // }
                // );
                _this.allContacts = _this.allContacts.filter(function (x) { return x; });
                debugger;
                _this.alphabet = Array.from(new Set(_this.allContacts.map(function (x) {
                    if (x.displayName) {
                        return x.displayName[0];
                    }
                }).map(function (item) { return item; }))).sort(function (n1, n2) { if (n1 < n2) {
                    return -1;
                } return 1; });
                ;
                _this.alphabetContacts = [];
                _this.alphabet.forEach(function (x) {
                    var alphabetContact = new AlphabetContacts();
                    alphabetContact.letter = x;
                    alphabetContact.contacts = _this.allContacts.map(function (c) {
                        if (x && c && c.displayName && c.displayName.indexOf(x) == 0) {
                            return c;
                        }
                    });
                    _this.alphabetContacts.push(alphabetContact);
                });
                _this.alphabetContacts = _this.alphabetContacts.map(function (x) {
                    x.contacts = x.contacts.filter(function (y) { return y; });
                    return x;
                });
                console.log(_this.alphabetContacts);
            });
        };
    }
    HomePage.prototype.ngOnInit = function () {
        this.chechPermissions();
        this.getFiltered('');
        console.log(this.allContacts);
    };
    HomePage.prototype.sanitizeImage = function (value) {
        return this.sanitizer.bypassSecurityTrustUrl(value);
    };
    HomePage.prototype.getImgContent = function (item) {
        return this.sanitizer.bypassSecurityTrustUrl(item);
    };
    HomePage.prototype.compare = function (a, b) {
        if (a.displayName < b.displayName)
            return -1;
        if (a.displayName > b.displayName)
            return 1;
        return 0;
    };
    HomePage.prototype.find = function (ev) {
        debugger;
        this.getFiltered(ev.target.value);
    };
    HomePage.prototype.chechPermissions = function () {
        var _this = this;
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_CONTACTS); });
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_CONTACTS, this.androidPermissions.PERMISSION.WRITE_CONTACTS]);
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AndroidPermissions,
            NavController,
            Contacts,
            DomSanitizer])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
var AlphabetContacts = /** @class */ (function () {
    function AlphabetContacts() {
    }
    AlphabetContacts.prototype.AlphabetContacts = function () {
        this.contacts = new Array();
    };
    return AlphabetContacts;
}());
export { AlphabetContacts };
//# sourceMappingURL=home.page.js.map