import {Page, NavController, NavParams} from 'ionic-angular';
import { Roteiro } from '../../providers/roteiro/roteiro';
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
export class RoteiroPage {
  static get parameters() {
    return [[NavController], [Roteiro], [DomSanitizationService]];
  }

  constructor(NavController, RoteiroService, sanitizer) {
    this.nav = NavController;
    this.RoteiroService = RoteiroService;
    this.flights = [];
    this.sanitizer = sanitizer;


    this.initializeRoteiro();

  }
  
  sanitizeHtml(content) {
    console.log("this ->")
    console.log(this)
    var htmlText = this.sanitizer.bypassSecurityTrustHtml(content).changingThisBreaksApplicationSecurity;
    return htmlText;
  }
  
  initializeRoteiro(){

    console.log("window.localStorage ->")
    console.log(window.localStorage)

    this.RoteiroService.load(window.localStorage).subscribe((data) => {
      this.roteiro = data;
      console.log(data)
    });
  }
}
