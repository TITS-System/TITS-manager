import {AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {RouterLinkWithHref} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}