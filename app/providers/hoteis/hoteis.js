import {Injectable} from '@angular/core';
import {HOTEIS} from './hoteis.mock';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash/lodash';

@Injectable()
export class Hoteis {

    findAll() {
        return Observable.create(observer => {
            observer.next(HOTEIS);
            observer.complete();
        });
    }

    findById(id) {
        return Observable.create(observer => {
            observer.next(_.find(HOTEIS, {'id': id}));
            observer.complete();
        });
    }

}
