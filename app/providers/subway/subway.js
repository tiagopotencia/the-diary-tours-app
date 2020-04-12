import { Observer } from 'rxjs/Rx.KitchenSink';
import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'; 
import * as _ from 'lodash/lodash';

@Injectable()
export class Subways {
static get parameters() {
        return [[Http]];
    }

  
  constructor(http) {
    this.http = http
    this.data = [];
  }
    load() {
        return Observable.create(observer =>{
      this.http.get('https://thediarytours.com/app/json/subways.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          observer.next(this.data);
          observer.complete;
        });
          
    });
    }
}