import {AfterViewInit, ViewChild, Component, OnInit} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {RouterLinkWithHref} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {OrderInterface} from '../../../../shared/interfaces/order.interface';
import {OrderService} from '../../services/order.service';
import {RestaurantService} from '../../services/restaurant.service';


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
    private _restaurantService: RestaurantService
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


  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const restaurantId = this._restaurantService.getSelectedRestaurantId();
    this._orderService.loadOrdersByRestaurantId(restaurantId)
      .subscribe(() => {
        this.orders = this._orderService.orders;
        console.table(this.orders);
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

  // getDateString(beginAt: number): string {
  //
  // }

  openOrderById(OrderId: number): void {

  }
}
