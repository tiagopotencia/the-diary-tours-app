import { Observer } from 'rxjs/Rx.KitchenSink';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the PontoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Roteiro {
  data: any; 
  constructor(@Injectable(http)) {
    this.data;
  }
  // chama dados
  load() {
    if (this.data) {
      // already loaded data
        return Observable.create(observer =>{
        observer.next(this.data);
        observer.complete;    
      });
    }
    new Promise(resolve => {
      this.http.get('https://stormy-tundra-43639.herokuapp.com/v1/tripuser/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });

    return Observable.create(observer =>{
      observer.next(this.data);
      observer.complete;    
    });
  }
}