import {Page, Platform, NavController, NavParams} from 'ionic-angular';
import {Roteiro} from '../../providers/roteiro/roteiro';
import * as _ from '../../../node_modules/lodash/lodash';
import {Observable} from 'rxjs/Observable';
import { DomSanitizationService } from '@angular/platform-browser';


/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/roteiro/list.html'
})

export class RoteirosPage {
  static get parameters() {
    return [[Platform], [NavController], [NavParams], [Roteiro], [DomSanitizationService]];
  }

  constructor(Platform, NavController, NavParams, RoteiroService, sanitizer) {
    this.Platform = Platform;
    this.nav = NavController;
    this.params = NavParams.data;
    this.sanitizer = sanitizer;

    this.RoteiroService = RoteiroService;
    this.roteiro = [];
  }

  sanitizeHtml(content) {
    var htmlText = this.sanitizer.bypassSecurityTrustHtml(content).changingThisBreaksApplicationSecurity;
    return htmlText;
  }
  
  ngOnInit(){
    var param = unescape(this.params.id);
    console.log(param);
    this.Platform.ready().then(() => {
      this.RoteiroService.loadByDay(param).subscribe((data) => {
        this.roteiro = data;
      })
    })
  }
}
