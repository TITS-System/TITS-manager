import {AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {RouterLinkWithHref} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';
import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {OrderInterface} from '../../../../shared/interfaces/order.interface';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor() { }

  order: OrderInterface[] = [];

  // get dataSource(): any {
  //   if (!this.search) {
  //     return
  //   }
  //
  //   return
  // }

  search = '';



  ngOnInit(): void {
  }

  // async getRestaurants(): Promise<RestaurantInterface[]> {
  //   this.restaurants = await this.restaurantService.getAllRestaurants();
  //   console.log(this.restaurants);
  //   return this.restaurants;
  // }

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
