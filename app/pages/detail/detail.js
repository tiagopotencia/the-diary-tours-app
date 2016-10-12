import {Page, NavController, NavParams, Platform} from 'ionic-angular';
import {Geolocation, LaunchNavigator} from 'ionic-native';
import {PlacesPage} from '../places/places';
import {Places} from '../../providers/places/places';
/*
  Generated class for the DetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/detail/detail.html',
})
export class DetailPage {
  static get parameters() {
    return [[NavController], [NavParams], [Places], [Platform]];
  }

  constructor(nav, navParams, PlacesService, Platform) {
    this.nav = nav;
    this.params = navParams.data;
    this.PlacesService = PlacesService;
    this.Platform = Platform;
  }

  getDirections(place){
    this.Platform.ready().then(() => {
      Geolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then((data) => {
        LaunchNavigator.navigate(
          [place.coords.latitude, place.coords.longitude],
          [data.coords.latitude, data.coords.longitude])
          .then(
            success => console.log('Launched navigator'),
            error => console.log('Error launching navigator', error)
          );
      })
    })

  }

  ngOnInit(){
    this.PlacesService.findById(this.params.id).subscribe((place) => {
      this.place = place;
    })
  }
}
