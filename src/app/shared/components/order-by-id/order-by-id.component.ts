import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {OrderInterface} from '../../interfaces/order.interface';
import {DeliveryInterface} from '../../interfaces/delivery.interface';
import {OrderService} from '../../../modules/manager/services/order.service';
import {RestaurantService} from '../../../modules/manager/services/restaurant.service';
import {DeliveryService} from '../../../modules/manager/services/delivery.service';
import {Router} from '@angular/router';
import {FullOrderInterface} from '../../interfaces/fullOrder.interface';

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

  private _currentOrder: OrderInterface = {
    id: -1,
    addressString: '',
    creationDateTime: ''
  };

  fullOrder: FullOrderInterface = {
    id: -1,
    addressString: '',
    addressAdditional: '',
    content: '',
    creationDateTime: ''
  };


  get currentOrder(): OrderInterface {
    return this._currentOrder;
  }

  set currentOrder(value) {
    this._currentOrder = value;
  }


  // tslint:disable-next-line:variable-name
  constructor(private _orderService: OrderService,
              // tslint:disable-next-line:variable-name
              private _restaurantService: RestaurantService,
              // tslint:disable-next-line:variable-name
              private _deliveriesService: DeliveryService,
              private router: Router
  ) {
  }

  displayedColumns: string[] = [
    'Id',
    'OrderId',
    'CourierUsername',
    'TimeRange',
    'Status'
  ];
  // tslint:disable-next-line:variable-name
  private _sortedOrders = [];

  ngOnInit(): void {
    this.loadOrderById();
    // this.loadDeliveriesByOrderId(this.selectedOrderId);
    console.table(this.deliveries);
  }

  loadDeliveriesByOrderId(orderId: number): void {
    // this.restaurants = await this.restaurantService.getAllRestaurants();
    this._deliveriesService.getDeliveriesByOrderId(orderId)
      .subscribe(() => {
        this._deliveries = this._deliveriesService.deliveries;
        console.log(this._deliveries);
      }, error => {
        console.log(error.message);
      });
  }

  hide(): void {
    this.isHidden.emit();
  }

  openDeliveryById(id: number): void {

  }

  getProperLink(id: number): string {
    let propStr = String(id);

    while (propStr.length < 9) {
      propStr = '0' + propStr;
    }

    return propStr;
  }

  openCourierById(id: number): void {
    this.router.navigate(['/manager', 'couriers', `${id}`]);
  }

  private loadOrderById(): void {
    if (this.selectedOrderId != -1) {
      this._orderService.loadOrderById(this.selectedOrderId)
        .subscribe(() => {
          this.currentOrder = this._orderService.currentOrder;
        }, error => {
          console.log(error.message);
        });
    }
  }

  private loadFullOrderById(): void {
    if (this.selectedOrderId != -1) {
      this._orderService.loadFullOrderById(this.selectedOrderId)
        .subscribe(() => {
          this.currentOrder = this._orderService.currentOrder;
        }, error => {
          console.log(error.message);
        });
    }
  }

}
