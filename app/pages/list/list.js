import {Page, NavController, NavParams} from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import {Cities} from '../../providers/cities/cities';
import {Places} from '../../providers/places/places';
import * as _ from '../../../node_modules/lodash/lodash';

/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/list/list.html',
})
export class ListPage {
  static get parameters() {
    return [[NavController], [NavParams], [Cities], [Places]];
  }

  constructor(NavController, NavParams, CitiesService, PlacesService) {
    this.nav = NavController;
    this.params = NavParams.data;

    this.CitiesService = CitiesService;
    this.PlacesService = PlacesService;

    this.city = null;
    this.places = [];
    this.map = {};
    this.loading = true;
    this.searchQuery = '';

    this.CitiesService.findById(this.params.id).subscribe((data) => {
      this.city = data;
      this.map.coords = data.coords;
    })

    this.initializePlaces();
  }

  goToDetails(id) {
    this.nav.push(DetailPage, {
      id: id
    })
  }

  initializePlaces(){
    this.PlacesService.findByCityId(this.params.id).subscribe((places) => {
      this.places = places;
      this.loading = false;
    })
  }

  getPlaces(searchbar) {
    // Reset items back to all of the items
    this.initializePlaces();

    // set q to the value of the searchbar
    let q = searchbar.value.toLowerCase();

    // if the value is an empty string don't filter the items
    if (q.trim() === '') return;

    this.places = _.filter(this.places, (p) => p.name.toLowerCase().indexOf(q) > -1);
  }

}
