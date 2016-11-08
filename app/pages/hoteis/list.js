import {Page, NavController, NavParams} from 'ionic-angular';
import {Hoteis} from '../../providers/hoteis/hoteis';
import * as _ from '../../../node_modules/lodash/lodash';
import {Observable} from 'rxjs/Observable';
import {HOTEIS} from '../../providers/hoteis/hoteis.mock';

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
    return [[NavController], [NavParams], [Hoteis]];
  }

  constructor(NavController, HoteisService) {
    this.nav = NavController;
    this.HoteisService = HoteisService;
    this.hoteis = [];


    this.initializeHoteis();

  }

  initializeHoteis(){
    this.findAll().subscribe((data) => {
      this.hoteis = data;
    })
  }

  findAll() {
      return Observable.create(observer => {
          observer.next(HOTEIS);
          observer.complete();
      });
  }
}
