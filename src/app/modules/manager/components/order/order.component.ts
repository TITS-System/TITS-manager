import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderInterface } from '../../../../shared/interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { RestaurantService } from '../../services/restaurant.service';
import { CourierInterface } from '../../../../shared/interfaces/courier.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor(
    // tslint:disable-next-line:variable-name
    private _orderService: OrderService,
    // tslint:disable-next-line:variable-name
    private _restaurantService: RestaurantService,
    private httpClient: HttpClient
  ) {
  }


  orders: OrderInterface[] = [];
  // tslint:disable-next-line:variable-name
  private _sortedOrders = [];


  search = '';


  get sortedOrders(): OrderInterface[] {
    if (!this.search) {
      return this.orders;
    }

    return this.orders.filter(o =>
      o.id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
      o.addressString.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
      o.creationDateTime.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1
    );
  }


  // tslint:disable-next-line:variable-name
  private _selectedOrderId = -1;
  get selectedOrderId(): number {
    return this._selectedOrderId;
  }

  set selectedOrderId(value: number) {
    this._selectedOrderId = value;
  }

  ngOnInit(): void {
    this.loadOrders();
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);

    this.httpClient.get(`${environment.apiUrl}/AutoDeliveryServer/getstate?restaurantId=${this._restaurantService.getSelectedRestaurantId()}`, { headers })
      .subscribe((response: any) => {
        this.autoDistribution = response;
      });
  }

  loadOrders(): void {
    const restaurantId = this._restaurantService.getSelectedRestaurantId();

    this._orderService.loadOrdersByRestaurantId(restaurantId)
      .subscribe(() => {
        this.orders = this._orderService.orders;
      }, error => {
        console.log(error.message);
      });
  }

  getProperLink(id: number): string {
    let propStr = String(id);

    while (propStr.length < 9) {
      propStr = '0' + propStr;
    }

    return propStr;
  }

  openOrderById(OrderId: number): void {
    this.selectedOrderId = OrderId;

    this.showOrderById();
  }

  showOrderById(): void {
    (document.querySelector('.absolute-window') as HTMLElement).style.left = '0';
  }

  hideOrderById(): void {
    (document.querySelector('.absolute-window') as HTMLElement).style.left = '100%';
  }

  autoDistribution: boolean = false;

  toggelAutoDistribution(): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);

    if (this.autoDistribution) {
      this.httpClient.get(`${environment.apiUrl}/AutoDeliveryServer/enable?restaurantId=${this._restaurantService.getSelectedRestaurantId()}`, { headers })
        .subscribe((response: any) => {
        });
    }
    else {
      this.httpClient.get(`${environment.apiUrl}/AutoDeliveryServer/disable?restaurantId=${this._restaurantService.getSelectedRestaurantId()}`, { headers })
        .subscribe((response: any) => {
        });
    }
  }
}
