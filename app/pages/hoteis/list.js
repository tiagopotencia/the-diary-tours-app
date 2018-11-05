import {Page, NavController, NavParams} from 'ionic-angular';
import {Hoteis} from '../../providers/hoteis/hoteis';
import * as _ from '../../../node_modules/lodash/lodash';
import {Observable} from 'rxjs/Observable';
import {HOTEIS} from '../../providers/hoteis/hoteis.mock';
import { DomSanitizationService } from '@angular/platform-browser';

/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/hoteis/list.html',
})
export class HoteisPage {
  static get parameters() {
    return [[NavController], [NavParams], [DomSanitizationService]];
  }

  constructor(NavController, HoteisService, sanitizer) {
    this.nav = NavController;
    this.HoteisService = HoteisService;
    this.hoteis = [];
    this.sanitizer = sanitizer;

    var data = JSON.parse(window.localStorage.getItem("hoteis"));
    this.initializeHoteis(data);

  }

  sanitizeHtml(content) {
    console.log("this ->")
    console.log(this)
    var htmlText = this.sanitizer.bypassSecurityTrustHtml(content).changingThisBreaksApplicationSecurity;
    return htmlText;
  }

  initializeHoteis(dataLocal){
    this.findAll(dataLocal).subscribe((data) => {
      this.hoteis = data;
    })
  }

  findAll(data) {
      return Observable.create(observer => {
          observer.next(data);
          observer.complete();
      });
  }
}
