import {Page, NavController, NavParams, Platform} from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import {ListPage} from '../list/list';
import {Geolocation} from 'ionic-native';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from '../../../node_modules/angular2-google-maps/core';
import {Cities} from '../../providers/cities/cities';
import {Places} from '../../providers/places/places';

@Page({
  templateUrl: 'build/pages/places/places.html',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES]
})
export class PlacesPage {
  static get parameters() {
    return [[Platform], [NavController], [NavParams], [Cities], [Places]];
  }

  constructor(Platform, NavController, NavParams, CitiesService, PlacesService) {
    this.Platform = Platform;
    this.nav = NavController;
    this.params = NavParams.data;
    this.CitiesService = CitiesService;
    this.PlacesService = PlacesService;

    this.city = null;
    this.me = null;
    this.map = {};
    this.places = [];
    this.loading = true;
  }

  findMe(){
    this.loading = true;
    this.Platform.ready().then(() => {
      Geolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then((data) => {
        this.me = data;
        this.me.iconUrl = 'assets/images/userMarker.png';

        // Change this after implements boundsChange
        this.map.coords = data.coords;
        this.loading = false;
      })
    })
  }

  goToDetails(id) {
    this.nav.push(DetailPage, {
      id: id
    })
  }

  goToList(id) {
    this.nav.push(ListPage, {
      id: id
    })
  }

  ngOnInit(){
    this.Platform.ready().then(() => {
      this.CitiesService.findById(this.params.id).subscribe((data) => {
        this.city = data;
        this.map.coords = data.coords;

        this.PlacesService.findByCityId(this.params.id).subscribe((places) => {
          this.places = places;
          this.loading = false;
        })
      })
    })
  }
}
