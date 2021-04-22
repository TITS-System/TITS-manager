import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, throwIfEmpty} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {OrderInterface} from '../../../shared/interfaces/order.interface';
import {AccountService} from '../../../shared/services/account.service';
import {DeliveryInterface} from '../../../shared/interfaces/delivery.interface';
import {FullOrderInterface} from '../../../shared/interfaces/fullOrder.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  postfix = 'order';

  // tslint:disable-next-line:variable-name
  private _orders: OrderInterface[] = [];

  private _currentOrder: OrderInterface = {
    id: -1,
    addressString: '',
    creationDateTime: ''
  };
  private _fullOrder: FullOrderInterface = {
    id: -1,
    addressString: '',
    addressAdditional: '',
    content: '',
    creationDateTime: ''
  };

  get fullOrder(): FullOrderInterface {
    return this._fullOrder;
  }

  get currentOrder(): OrderInterface {
    return this._currentOrder;
  }


  get orders(): OrderInterface[] {
    return this._orders;
  }

  // tslint:disable-next-line:variable-name
  private _deliveriesByOrderId: DeliveryInterface[] = [];

  get deliveriesByOrderId(): DeliveryInterface[] {
    return this._deliveriesByOrderId;
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

  loadOrderById(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/MGetInfo?orderId=${id}`, {withCredentials: true})
      .pipe(
        map((response: any) => {
          this._currentOrder = response.order;
        })
      );
  }

  loadFullOrderById(id: number): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/${this.postfix}/MGetInfo?orderId=${id}`, {withCredentials: true})
      .pipe(
        map((response: any) => {
          this._fullOrder = response.order;
        })
      );
  }
}
