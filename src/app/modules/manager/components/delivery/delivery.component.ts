import {Component, OnInit} from '@angular/core';
import {DeliveryInterface} from '../../../../shared/interfaces/delivery.interface';
import {DeliveryStatus} from '../../../../shared/enums/delivery.enum';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';
import {Router} from '@angular/router';
import {RestaurantInterface} from '../../../../shared/interfaces/restaurant.interface';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit {

  deliveries: DeliveryInterface[] = [];
  // tslint:disable-next-line:variable-name
  private _sortedOrders = [];

  search = '';

  get dataSource(): any {
    if (!this.search) {
      return new MatTableDataSource(this.deliveries);
    }

    return new MatTableDataSource(
      this.deliveries.filter((c: DeliveryInterface) =>
        c.Id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.OrderId.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.CourierUsername.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        new Date(c.TimeRange.BeginAt).toDateString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        new Date(c.TimeRange.FinishAt).toDateString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.Status.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1));
  }

  displayedColumns: string[] = [
    'Id',
    'OrderId',
    'CourierUsername',
    'TimeRange',
    'Status'
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {

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
