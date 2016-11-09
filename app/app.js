import {App, Platform, Storage, LocalStorage} from 'ionic-angular';
import {Splashscreen, StatusBar} from 'ionic-native';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from '../node_modules/angular2-google-maps/core';
import {IntroPage} from './pages/intro/intro';
import {HomePage} from './pages/home/home';
import {Cities} from './providers/cities/cities';
import {Places} from './providers/places/places';
import {Hoteis} from './providers/hoteis/hoteis'; 
import {Roteiro} from './providers/roteiro/roteiro';
import {Flights} from './providers/flights/flights'; 

@App({
  template: '<ion-nav id="my-nav" [root]="rootPage"></ion-nav>',
  config: {
    mode: 'md'
  }, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [ANGULAR2_GOOGLE_MAPS_PROVIDERS, Cities, Places, Hoteis, Roteiro, Flights]
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.local = new Storage(LocalStorage);

    this.local.get('introShown').then((result) => {
      if(result){
        this.rootPage = HomePage;
      } else {
        this.local.set('introShown', true);
        this.rootPage = HomePage;
      }
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit() chamado");
    Splashscreen.hide();
  }
}
