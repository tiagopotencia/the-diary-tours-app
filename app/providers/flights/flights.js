import { Observer } from 'rxjs/Rx.KitchenSink';
import { Injectable } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable'; 
import * as _ from 'lodash/lodash';

@Injectable()
export class Flights {
static get parameters() {
        return [[Http]];
    }

  
  constructor(http) {
    this.http = http
    this.data = [];
  }
    load() {
        return Observable.create(observer =>{
      this.http.get('http://www.thediarytours.com/wp-json/wp/v2/voo?filter[category]=viagem1')
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
          this.data = data;
          observer.next(this.data);
          observer.complete;
        });
          
    // });
    // }

    // load(db) {
    //   return Observable.create(observer =>{
    //     console.log("this ->")
    //     console.log(db)
    // new Observable(JSON.parse(db.getItem("voos"))) 
    //   .subscribe(data => {
    //     this.data = data;
    //     observer.next(this.data);
    //     observer.complete;
    //   });
        
  });
  }
}