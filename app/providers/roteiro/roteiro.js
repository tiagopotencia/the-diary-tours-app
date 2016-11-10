import { Observer } from 'rxjs/Rx.KitchenSink';
import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'; 
import * as _ from 'lodash/lodash';

/*
  Generated class for the PontoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Roteiro {
  static get parameters() {
        return [[Http]];
    }

  
  constructor(http) {
    this.http = http
    this.data = [];
  }
  // chama dados
  load() {
    return Observable.create(observer =>{
      this.http.get('https://stormy-tundra-43639.herokuapp.com/v1/itinerary/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.Content;
          observer.next(this.data);
          observer.complete;
        });
          
    });
  }

  loadByDay(dia) {
    return Observable.create(observer =>{
      this.http.get('https://stormy-tundra-43639.herokuapp.com/v1/itinerary/'+unescape(dia))
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.Content;
          observer.next(this.data);
          observer.complete;
        });
          
    });
  }
}