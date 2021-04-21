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
    {Id: 1, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 2, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 3, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 4, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 5, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 6, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 7, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 8, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 9, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 10, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    {Id: 11, OrderId: 321, CourierUsername: 'Sasha', TimeRange: {BeginAt: new Date(), FinishAt: new Date()}, Status: DeliveryStatus.Finished },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
