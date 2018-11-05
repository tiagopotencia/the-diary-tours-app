import {Page, NavController, NavParams} from 'ionic-angular';
import {Flights} from '../../providers/flights/flights';
import * as _ from '../../../node_modules/lodash/lodash';
import {Observable} from 'rxjs/Observable';
import { DomSanitizationService } from '@angular/platform-browser';

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
    return [[NavController], [Flights], [DomSanitizationService]];
  }

  constructor(NavController, FlightService, sanitizer) {
    this.nav = NavController;
    this.FlightService = FlightService;
    this.flights = [];
    this.sanitizer = sanitizer;


    this.initializeFlights();

  }
  
  sanitizeHtml(content) {
    console.log("this ->")
    console.log(this)
    var htmlText = this.sanitizer.bypassSecurityTrustHtml(content).changingThisBreaksApplicationSecurity;
    return htmlText;
  }
  
  initializeFlights(){

    console.log("window.localStorage ->")
    console.log(window.localStorage)

    this.FlightService.load(window.localStorage).subscribe((data) => {
      this.flights = data;
      console.log(data)
    });
  }
}
