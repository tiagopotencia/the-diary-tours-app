import {NavController, Page} from 'ionic-angular';
import {PlacesPage} from '../places/places';
import {Cities} from '../../providers/cities/cities';
import {ListPage} from '../list/list';

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

  goToList(id) {
    this.nav.push(ListPage, {
      id: id
    })
  }

  ngOnInit() {
    this.CitiesService.findAll().subscribe((data) => {
      this.cities = data;
    })
  }
}