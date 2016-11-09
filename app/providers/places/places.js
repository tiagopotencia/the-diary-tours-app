import {Injectable} from '@angular/core';
import {PLACES} from './places.mock';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash/lodash';

@Injectable()
export class Places {

    findAll() {
        return Observable.create(observer => {
            observer.next(PLACES);
            observer.complete();
        });
    }

    findById(id) {
        return Observable.create(observer => {
            observer.next(_.find(PLACES, {'id': id}));
            observer.complete();
        });
    }

    findByCityId(id) {
        return Observable.create(observer => {
            observer.next(_.filter(PLACES, {'city': id}));
            observer.complete();
        });
    }

}