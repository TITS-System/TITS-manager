import {Component, OnInit} from '@angular/core';
import {DeliveryInterface} from '../../../../shared/interfaces/delivery.interface';
import {DeliveryStatus} from '../../../../shared/enums/delivery.enum';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';
import {Router} from '@angular/router';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit {

  ELEMENT_DATA: DeliveryInterface[] = [
    {
      Id: 1,
      OrderId: 321,
      CourierUsername: 'Sasha',
      TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()},
      Status: DeliveryStatus.Cancelled
    },
    {
      Id: 2,
      OrderId: 321,
      CourierUsername: 'Danya',
      TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()},
      Status: DeliveryStatus.Delivered
    },
    {
      Id: 3,
      OrderId: 321,
      CourierUsername: 'Pasha',
      TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()},
      Status: DeliveryStatus.Delivering
    },
    {Id: 4, OrderId: 321, CourierUsername: 'Vlad', TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()}, Status: DeliveryStatus.Cancelled},
    {Id: 5, OrderId: 321, CourierUsername: 'Egor', TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()}, Status: DeliveryStatus.Cancelled},
    {Id: 8, OrderId: 321, CourierUsername: 'Gena', TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()}, Status: DeliveryStatus.Cancelled},
    {
      Id: 6,
      OrderId: 321,
      CourierUsername: 'Alexei',
      TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()},
      Status: DeliveryStatus.Cancelled
    },
    {Id: 7, OrderId: 321, CourierUsername: 'Petr', TimeRange: {BeginAt: Date.now(), FinishAt: Date.now()}, Status: DeliveryStatus.Cancelled},
  ];

  search = '';

  get dataSource(): any {
    if (!this.search) {
      return new MatTableDataSource(this.ELEMENT_DATA);
    }

    return new MatTableDataSource(
      this.ELEMENT_DATA.filter((c: DeliveryInterface) =>
        c.Id.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.OrderId.toString().toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
        c.CourierUsername.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
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
  }

  getProperLink(id: number) {
    let propStr = String(id);

    while (propStr.length < 9) {
      propStr = '0' + propStr;
    }

    return propStr;
  }

  getDateString(beginAt: number) {
    return new Date(beginAt).toDateString();
  }

  openDeliveryById(Id: number) {
    //TODO
    // this.router.navigate(['/manager', 'delivery/:${}'])
  }

  openOrderById(OrderId: number) {

  }
}
