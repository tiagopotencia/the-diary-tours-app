import {Page, NavController, NavParams} from 'ionic-angular';
import * as _ from '../../../node_modules/lodash/lodash';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/subway/list.html'
})

export class SubwaysPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(NavController) {
    this.nav = NavController;

  }
}
