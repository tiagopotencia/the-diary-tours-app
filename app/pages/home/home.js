import { NavController, Page, MenuController, Platform, Storage, LocalStorage } from 'ionic-angular';
import { PlacesPage } from '../places/places';
import { Cities } from '../../providers/cities/cities';
import { Roteiro } from '../../providers/roteiro/roteiro';
import { ListPage } from '../list/list';
import { HoteisPage } from '../hoteis/list';
import { FlightsPage } from '../flights/list';
import { SubwaysPage } from '../subway/list';
import { DomSanitizationService } from '@angular/platform-browser';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController], [Roteiro], [DomSanitizationService], [Platform]];
  }

  constructor(nav, RoteiroService, sanitizer, platform) {
    this.nav = nav;
    this.RoteiroService = RoteiroService;
    this.roteiro = [];
    this.sanitizer = sanitizer;

    

  }

  goToPlaces(id) {
    this.nav.push(PlacesPage, {
      id: id
    })
  }

  goToFlights() {
    this.nav.push(FlightsPage)
  }

  goToSubways() {
    this.nav.push(SubwaysPage)
  }

  goToList() {
    this.nav.push(ListPage)
  }

  goToHoteis(id) {
    this.nav.push(HoteisPage, {
      id: id
    })
  }

  sanitizeHtml(content) {
    var htmlText = this.sanitizer.bypassSecurityTrustHtml(content).changingThisBreaksApplicationSecurity;
    return htmlText;
  }

  ngOnInit() {
    // this.CitiesService.findAll().subscribe((data) => {
    //   this.cities = data;
    // });
    this.RoteiroService.load().subscribe((data) => {
      this.roteiro = data;
    });

    var divLoading = document.getElementById('loading');
    divLoading.style.display = "none";

    this.local = new Storage(LocalStorage);

    this.local.get('logged').then((result) => {
      if (result) {
        this.loggedMode();
      } else {
      }
    });
  }

  login() {
    var tripCode = prompt("Insira seu código de viagem", "");

    tripCode = tripCode.toUpperCase()

    if (tripCode == "TFEMI2016") {
      this.local.set('logged', true);
      this.loggedMode();
    }
    else {
      alert("Código de viagem não encontrado.")
    }

  }

  loggedMode() {
    var divRoteiro = document.getElementById('divRoteiro');
    divRoteiro.setAttribute("style", "display:block");

    var img = document.getElementById('img-home');

    img.setAttribute('src', 'http://tplabs.com.br/cdn/homelogada.jpg');

    var btnLogin = document.getElementById('btnLogin');
    btnLogin.innerText = "TFE";

    var btnMenu = document.getElementById('btnMenu');
    btnMenu.style.display = "block";

    this.RoteiroService.load().subscribe((data) => {
      this.roteiro = data;
    });
  }
}
