import {Injectable} from '@angular/core';
import {CITIES} from './cities.mock';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash/lodash';

@Injectable()
export class Cities {

    findAll() {
        return Observable.create(observer => {
            observer.next(CITIES);
            observer.complete();
        });
    }

    findById(id) {
        return Observable.create(observer => {
            observer.next(_.find(CITIES, {'id': id}));
            observer.complete();
        });
    }

}