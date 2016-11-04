import {Injectable} from '@angular/core';
import {ROTEIRO} from './roteiro.mock';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash/lodash';

@Injectable()
export class Roteiro {

    findAll() {
        return Observable.create(observer => {
            observer.next(ROTEIRO);
            observer.complete();
        });
    }

    findById(id) {
        return Observable.create(observer => {
            observer.next(_.find(ROTEIRO, {'id': id}));
            observer.complete();
        });
    }

    findByCityId(id) {
        return Observable.create(observer => {
            observer.next(_.filter(ROTEIRO, {'city': id}));
            observer.complete();
        });
    }

}