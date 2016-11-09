import {Page, NavController, NavParams} from 'ionic-angular';
import {Flights} from '../../providers/flights/flights';
import * as _ from '../../../node_modules/lodash/lodash';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/flights/list.html',
})
export class FlightsPage {
  static get parameters() {
    return [[NavController], [Flights]];
  }

  constructor(NavController, FlightService) {
    this.nav = NavController;
    this.FlightService = FlightService;
    this.flights = [];


    this.initializeFlights();

  }

  initializeFlights(){
    this.FlightService.load().subscribe((data) => {
      this.flights = data;
      console.log(data)
    });
  }
}
