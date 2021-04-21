import { Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DeliveryInterface} from '../../../../shared/interfaces/delivery.interface';
import {DeliveryStatus} from '../../../../shared/enums/delivery.enum';
import {Courier} from '../courier/courier.component';



@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit {

  ELEMENT_DATA: DeliveryInterface[] = [
    {Id: 1, OrderId: 321, Username: 'Sasha', IsOnWork: true, Id: 372824},
    {Id: 2, OrderId: 321, Username: 'Danya', IsOnWork: false, Id: 20223},
    {Id: 3, OrderId: 321, Username: 'Pasha', IsOnWork: true, Id: 889432121},
    {Id: 4, OrderId: 321, Username: 'Vlad', IsOnWork: true, Id: 2523},
    {Id: 5, OrderId: 321, Username: 'Egor', IsOnWork: false, Id: 6345},
    {Id: 8, OrderId: 321, Username: 'Gena', IsOnWork: false, Id: 7},
    {Id: 6, OrderId: 321, Username: 'Alexei', IsOnWork: true, Id: 567},
    {Id: 7, OrderId: 321, Username: 'Petr', IsOnWork: true, Id: 5674453},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
