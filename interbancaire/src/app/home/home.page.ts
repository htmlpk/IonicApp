import { NavController, Platform } from '@ionic/angular';
import { } from '@ionic-native/contacts';
import { Contacts, Contact, IContactFindOptions, ContactFieldType, ContactName, IContactField } from '@ionic-native/contacts/ngx';
import { Component, OnInit, Renderer } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

// import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public allContacts: Contact[] = [];
  public contactType: ContactFieldType[] = ["displayName"];
  public contact: Contact;
  public phoneNumbers: IContactField[];
  public alphabet: any[];
  public alphabetContacts: AlphabetContacts[] = [];
  private win: any = window;
  public addContactImageUrl;
  public ready:boolean = false;

  ngOnInit(): void {
    this.chechPermissions();
    this.checkUpdates();
    this.getFiltered('');
    console.log(this.allContacts);
  }

  constructor(private androidPermissions: AndroidPermissions,
    public navCtrl: NavController,
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    public renderer: Renderer,
    private http: HTTP,
    public plt: Platform,
    private appVersion: AppVersion) {
  }

  public sanitizeImage(value) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

  public checkUpdates(): void {
    let appVersion;
    this.appVersion.getVersionNumber().then(x => {
      appVersion = x;
      let storeVersion: string;
      if (this.plt.is("android")) {
        this.http.get("https://play.google.com/store/apps/details?id=com.moglix.vendor", null, null).then(data => {
          storeVersion = this.parceVersion(data.data.toString());
          debugger
          if (appVersion != storeVersion) {
            alert("Update required!");
          }
        });
      }
      if (this.plt.is("ios")) {
        this.http.get("http://itunes.apple.com/lookup?bundleId=com.moglix.vendor", null, null).then(data => {
          storeVersion = this.parceVersion(data.data.toString());
          debugger
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
  public getFiltered = (q) => {
    const option: IContactFindOptions = {
      filter: q,
      hasPhoneNumber: true,
    }
    setTimeout(() => {
      this.contacts.find(['displayName', , 'phoneNumbers'], option)
        .then(data => {
          this.allContacts = data
            .map(y => {
              if (y.photos) {
                y["image"] = this.win.Ionic.WebView.convertFileSrc(y.photos[0].value);
                return y
              }
              if (!y.photos) {
                y["image"] = this.sanitizer.bypassSecurityTrustUrl('assets/icon/dummy-profile-pic.png');
                return y
              }
            })
            .map(x => {
              let isNumbersExist = x.phoneNumbers.filter(n =>
                n.value.startsWith("06")
                || n.value.startsWith("07")
                || n.value.startsWith("+337")
                || n.value.startsWith("+336")
                || n.value.startsWith("44")
              )
              if (isNumbersExist.length > 0 && x.displayName) {
                x.phoneNumbers = isNumbersExist;
                if (x.photos) {
                  x.photo = this.sanitizer.bypassSecurityTrustUrl(x.photos[0].value);
                }
                return x
              }
            }
            );
          this.allContacts = this.allContacts.filter(x => x);
          this.alphabet = Array.from(new Set(this.allContacts.map(x => {
            if (x.displayName) {
              return x.displayName[0];
            }

          }).map((item: any) => item))).sort((n1, n2) => { if (n1 < n2) { return -1 } return 1 });;
          this.alphabet = this.alphabet.filter(x => x);
          this.alphabetContacts = [];
          this.alphabet.forEach(x => {
            let alphabetContact = new AlphabetContacts();
            alphabetContact.letter = x;
            alphabetContact.contacts = this.allContacts.map(c => {
              if (x && c && c.displayName && c.displayName.indexOf(x) == 0) {
                return c
              }
            });
            this.alphabetContacts.push(alphabetContact);
          }
          );
          this.alphabetContacts = this.alphabetContacts.map(x => {
            x.contacts = x.contacts.filter(y => y);
            return x;
          });
          console.log(this.alphabetContacts);
        });
        this.addContactImageUrl = this.sanitizer.bypassSecurityTrustUrl('assets/icon/add-contact.png')
        this.ready = true;
    }, 200);
  };

  compare(a, b) {
    if (a.displayName < b.displayName)
      return -1;
    if (a.displayName > b.displayName)
      return 1;
    return 0;
  }

  public toggleItem(ev): void {
    this.renderer.setElementStyle(ev.el, "max-height", "500px");
  }
  public find(ev): void {
    this.getFiltered(ev.target.value);
  }

  public chechPermissions(): void {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_CONTACTS).then(
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_CONTACTS)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_CONTACTS, this.androidPermissions.PERMISSION.WRITE_CONTACTS]);
  }
}

export class AlphabetContacts {
  public letter: string;
  public contacts: Array<Contact>;

  AlphabetContacts() {
    this.contacts = new Array<Contact>();
  }
}