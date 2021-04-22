import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {OrderInterface} from '../../interfaces/order.interface';
import {DeliveryInterface} from '../../interfaces/delivery.interface';
import {OrderService} from '../../../modules/manager/services/order.service';
import {RestaurantService} from '../../../modules/manager/services/restaurant.service';

@Component({
  selector: 'app-order-by-id',
  templateUrl: './order-by-id.component.html',
  styleUrls: ['./order-by-id.component.sass', '../../../modules/manager/components/delivery/delivery.component.sass']
})
export class OrderByIdComponent implements OnInit {

  @Input() selectedOrderId = -1;
  @Output() isHidden = new EventEmitter<void>();

  // tslint:disable-next-line:variable-name
  private _deliveries: DeliveryInterface[] = [];
  get deliveries(): DeliveryInterface[] {
    return this._deliveries;
  }

  set deliveries(value) {
    this._deliveries = value;
  }


  constructor(private _orderService: OrderService,
              private _restaurantService: RestaurantService
  ) {
  }

  orders: OrderInterface[] = [];
  private _sortedOrders = [];

  ngOnInit(): void {
  }


  hide(): void {
    this.isHidden.emit();
  }
}
