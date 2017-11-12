import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BaseApi} from "../../../shared/core/base-api";
import {Bill} from "../models/bill.model";
import {Observable} from "rxjs";

@Injectable()
export class BillService extends BaseApi {

  fixerApiCurrency = 'https://api.fixer.io/latest?base=';

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(base: string = 'RUB'): Observable<any> {
    return this.httpClient.get(`${this.fixerApiCurrency}${base}`);
  }
}
