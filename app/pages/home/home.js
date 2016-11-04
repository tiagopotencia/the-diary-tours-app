import {NavController, Page, MenuController} from 'ionic-angular';
import {PlacesPage} from '../places/places';
import {Cities} from '../../providers/cities/cities';
import {Roteiro} from '../../providers/roteiro/roteiro';
import {ListPage} from '../list/list';
import {HoteisPage} from '../hoteis/list';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static get parameters() {
    return [[NavController],[Roteiro]];
  }

  constructor(nav, RoteiroService) {
    this.nav = nav;
    this.RoteiroService = RoteiroService;
    this.roteiro = [];
    // this.sanitizer = sanitizer;
   
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
    // this.CitiesService.findAll().subscribe((data) => {
    //   this.cities = data;
    // });
     this.RoteiroService.load().subscribe((data) => {
      this.roteiro = data;
      console.log(data)
    });
  }

  login(){
    var tripCode = prompt("Insira seu código de viagem", "");

    tripCode = tripCode.toUpperCase()

    if (tripCode == "TFE2016")
    {
       var divRoteiro = document.getElementById('divRoteiro');
       divRoteiro.setAttribute("style", "display:block");
       alert("Seja bem-vindo!")

       var btnLogin = document.getElementById('btnLogin');
       btnLogin.innerText =tripCode;

       var btnMenu = document.getElementById('btnMenu');
       btnMenu.style.display = "block";

       this.RoteiroService.load().subscribe((data) => {
        this.roteiro = data;
        console.log(data)
        });
    }
    else{
      alert("Código de viagem não encontrado.")
    }

  }
}
