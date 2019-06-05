import { NavController, Platform } from '@ionic/angular';
import { } from '@ionic-native/contacts';
import { Contacts, Contact, IContactFindOptions, ContactFieldType, ContactName, IContactField } from '@ionic-native/contacts/ngx';
import { Component, OnInit, Renderer } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { UpdatesCheckService } from '../shared/services/updates-check.service';

// import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public allContacts: Contact[] = [];
  public contactType: ContactFieldType[] = ["displayName", "phoneNumbers"];
  public contact: Contact;
  public phoneNumbers: IContactField[];
  public alphabet: any[];
  public alphabetContacts: AlphabetContacts[] = [];
  private win: any = window;
  public addContactImageUrl = this.sanitizer.bypassSecurityTrustUrl('assets/icon/add-contact.png');
  public ready: boolean = false;

  ngOnInit(): void {
    this.getFiltered('');
  }

  constructor(
    public navCtrl: NavController,
    private contacts: Contacts,
    private sanitizer: DomSanitizer,
    public renderer: Renderer,
    public plt: Platform,
  ) {
  }

  public getFiltered = (q) => {
    this.ready = false;
    const option: IContactFindOptions = {
      filter: q,
      hasPhoneNumber: true,
    }
    setTimeout(() => {
      this.contacts.find(this.contactType, option)
        .then(data => {
          this.allContacts = data
            .map(y => {
              if (y.photos) {
                y["image"] = this.win.Ionic.WebView.convertFileSrc(y.photos[0].value);
                return y
              }
              if (!y.photos) {
                y.name.formatted = "";
                if (y.name.familyName) {
                  y.name.formatted = y.name.familyName[0]
                }
                y.name.formatted += y.name.givenName[0];
                return y
              }
            })
            .map(x => {
              let isNumbersExist = x.phoneNumbers.filter(n =>
                n.value.startsWith("06")
                || n.value.startsWith("07")
                || n.value.startsWith("+337")
                || n.value.startsWith("+336")
                //|| n.value.startsWith("44")
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

          this.ready = true;
        });
    }, 100);
    // this.alphabetContacts =JSON.parse("[{\"letter\":\"M\",\"contacts\":[{\"_objectInstance\":{\"id\":\"23\",\"rawId\":null,\"displayName\":\"Mehdi\",\"name\":{\"givenName\":\"Mehdi\",\"formatted\":\"Mehdi \"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"70\",\"pref\":false,\"value\":\"066 039 6795\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"23\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"А\",\"contacts\":[{\"_objectInstance\":{\"id\":\"480\",\"rawId\":null,\"displayName\":\"Афанаскин Андрей\",\"name\":{\"familyName\":\"Андрей\",\"givenName\":\"Афанаскин\",\"formatted\":\"Афанаскин Андрей\"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"1303\",\"pref\":false,\"value\":\"066 620 6271\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"478\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"Б\",\"contacts\":[{\"_objectInstance\":{\"id\":\"41\",\"rawId\":null,\"displayName\":\"Бабушка\",\"name\":{\"givenName\":\"Бабушка\",\"formatted\":\"Бабушка \"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"138\",\"pref\":false,\"value\":\"0684220405\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"46\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"Д\",\"contacts\":[{\"_objectInstance\":{\"id\":\"49\",\"rawId\":null,\"displayName\":\"Дудок Лена\",\"name\":{\"familyName\":\"Лена\",\"givenName\":\"Дудок\",\"formatted\":\"Дудок Лена\"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"144\",\"pref\":false,\"value\":\"0662897067\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"48\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}},{\"_objectInstance\":{\"id\":\"486\",\"rawId\":null,\"displayName\":\"Данил\",\"name\":{\"givenName\":\"Данил\",\"formatted\":\"Данил \"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"1326\",\"pref\":false,\"value\":\"066 922 5111\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"484\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"К\",\"contacts\":[{\"_objectInstance\":{\"id\":\"484\",\"rawId\":null,\"displayName\":\"Клубань Юрий\",\"name\":{\"familyName\":\"Юрий\",\"givenName\":\"Клубань\",\"formatted\":\"Клубань Юрий\"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"1318\",\"pref\":false,\"value\":\"066 438 9869\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"482\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"Л\",\"contacts\":[{\"_objectInstance\":{\"id\":\"552\",\"rawId\":null,\"displayName\":\"Львова Анна\",\"name\":{\"familyName\":\"Анна\",\"givenName\":\"Львова\",\"formatted\":\"Львова Анна\"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"1564\",\"pref\":false,\"value\":\"066 766 7618\",\"type\":\"mobile\"},{\"id\":\"1576\",\"pref\":false,\"value\":\"066 766 7618\",\"type\":\"mobile\"}],\"emails\":[{\"id\":\"1667\",\"pref\":false,\"value\":\"аааам@штт.рнг\",\"type\":\"work\"}],\"addresses\":null,\"ims\":null,\"organizations\":[{\"id\":\"1566\",\"pref\":false,\"name\":\"Anuitex\",\"title\":\"Project Manager\"}],\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"550\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"Н\",\"contacts\":[{\"_objectInstance\":{\"id\":\"567\",\"rawId\":null,\"displayName\":\"Наприковская Н. Н\",\"name\":{\"familyName\":\"Н\",\"givenName\":\"Наприковская\",\"middleName\":\"Н.\",\"formatted\":\"Наприковская Н. Н\"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"1632\",\"pref\":false,\"value\":\"066 732 3382\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"565\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]},{\"letter\":\"Р\",\"contacts\":[{\"_objectInstance\":{\"id\":\"529\",\"rawId\":null,\"displayName\":\"Резуненко А А\",\"name\":{\"familyName\":\"А\",\"givenName\":\"Резуненко\",\"middleName\":\"А\",\"formatted\":\"Резуненко А А\"},\"nickname\":null,\"phoneNumbers\":[{\"id\":\"1481\",\"pref\":false,\"value\":\"067 577 9125\",\"type\":\"mobile\"}],\"emails\":null,\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},\"rawId\":\"527\",\"image\":{\"changingThisBreaksApplicationSecurity\":\"assets/icon/dummy-profile-pic.png\"}}]}]") 
  };
}

export class AlphabetContacts {
  public letter: string;
  public contacts: Array<Contact>;

  AlphabetContacts() {
    this.contacts = new Array<Contact>();
  }
}