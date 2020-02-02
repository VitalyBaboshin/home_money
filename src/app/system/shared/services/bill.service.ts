import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {delay, map} from 'rxjs/operators';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) {super(http); }
  getBill(): Observable<Bill> {
    return this.get('bill');
  }
  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.http.get(`https://api.ratesapi.io/api/latest?base=${base}`)
      .pipe(map(res => res));
  }
}
