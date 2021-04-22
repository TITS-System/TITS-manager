import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {AccountService} from '../../../shared/services/account.service';
import {DeliveryInterface} from '../../../shared/interfaces/delivery.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {


  constructor(
    private as: AccountService
  ) {
  }

  private postfix = 'deliveries';

  deliveries: DeliveryInterface[] = [];

  getDeliveriesByOrderId(orderId: number): Observable<any> {

    const token = this.as.token;

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('auth-token', token);


    // @ts-ignore
    return this.http.get(`${environment.apiUrl}/${this.postfix}/GetByOrder/?orderId=${orderId}`, {headers})
      .pipe(
        map((deliveries: any) => {
          this.deliveries = deliveries.deliveries;
        })
      );
  }
}
