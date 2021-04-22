import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {OrderInterface} from '../../../shared/interfaces/order.interface';
import {AccountService} from '../../../shared/services/account.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  postfix = 'order';

  // tslint:disable-next-line:variable-name
  private _orders: OrderInterface[] = [];

  get orders(): OrderInterface[] {
    return this._orders;
  }


  constructor(
    // tslint:disable-next-line:variable-name
    private _httpClient: HttpClient,
    // tslint:disable-next-line:variable-name
    private accountService: AccountService,
    private router: Router
  ) {
  }


  loadOrdersByRestaurantId(restaurantId: number): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/GetAllByRestaurant?restaurantId=${restaurantId}`, {withCredentials: true})
      .pipe(
        map((response: any) => {
          this._orders = response.orders;
        })
      );
  }
}
