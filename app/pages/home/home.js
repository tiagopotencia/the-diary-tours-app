import {NavController, Page, MenuController} from 'ionic-angular';
import {PlacesPage} from '../places/places';
import {Cities} from '../../providers/cities/cities';
import {ListPage} from '../list/list';
import {HoteisPage} from '../hoteis/list';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController], [Cities]];
  }

  constructor(nav, CitiesService) {
    this.nav = nav;
    this.CitiesService = CitiesService;
    this.cities = [];
  }

  goToPlaces(id){
    this.nav.push(PlacesPage, {
      id: id
    })
  }

  goToList() {
    this.nav.push(ListPage)
  }

  goToHoteis(id) {
    this.nav.push(HoteisPage, {
      id: id
    })
  }

  ngOnInit() {
    this.CitiesService.findAll().subscribe((data) => {
      this.cities = data;
    })
  }

  login(){
    var tripCode = prompt("Insira seu código de viagem", "");

    tripCode = tripCode.toUpperCase()

    if (tripCode == "TFE2017")
    {
       var divRoteiro = document.getElementById('divRoteiro');
       divRoteiro.setAttribute("style", "display:block");
       alert("Seja bem-vindo!")

       var btnLogin = document.getElementById('btnLogin');
       btnLogin.innerText =tripCode;

       var btnMenu = document.getElementById('btnMenu');
       btnMenu.style.display = "block";
    }
    else{
      alert("Código de viagem não encontrado.")
    }

  }
}
