import {Component, OnInit} from '@angular/core';
import {DeliveryInterface} from '../../../../shared/interfaces/delivery.interface';
import {DeliveryStatus} from '../../../../shared/enums/delivery.enum';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';
import {Router} from '@angular/router';
import {RestaurantInterface} from '../../../../shared/interfaces/restaurant.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {RestaurantService} from '../../services/restaurant.service';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit {

  deliveries: {
    id:number;
    orderId:number;
    courierId: number;
    courierUsername:string;
    startTime:string;
    endTime:string;
    status:string;
  }[] = [

  ];
  // tslint:disable-next-line:variable-name
  private _sortedOrders = [];

  search = '';

  get dataSource(): any {
    if (!this.search) {
      return new MatTableDataSource(this.deliveries);
    }

    return new MatTableDataSource(
      this.deliveries.filter((c: DeliveryInterface) =>
        c.id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.orderId.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.courierUsername.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.startTime.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.status.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1));
  }

  displayedColumns: string[] = [
    'Id',
    'OrderId',
    'CourierUsername',
    'TimeRange',
    'Status'
  ];

  constructor(private router: Router,
              private httpClient: HttpClient,
              private restaurantService: RestaurantService
  ) {
  }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  private loadDeliveries(): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);
    this.httpClient.get(`${environment.apiUrl}/delivery/GetByRestaurantId?restaurantId=${this.restaurantService.getSelectedRestaurantId()}`, { headers })
      .subscribe((response: any) => {
        this.deliveries = response.deliveries;
      });
  }

  getProperLink(id: number): string {
    let propStr = String(id);

    while (propStr.length < 9) {
      propStr = '0' + propStr;
    }

    return propStr;
  }

  getDateString(beginAt: number): string {
    return new Date(beginAt).toDateString();
  }

  openDeliveryById(Id: number): void {
    // TODO
    // this.router.navigate(['/manager', 'delivery/:${}'])
  }

  openOrderById(OrderId: number): void {

  }

  openCourierById(CourierId: number): void {

  }
}
