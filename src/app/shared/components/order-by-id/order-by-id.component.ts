import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-by-id',
  templateUrl: './order-by-id.component.html',
  styleUrls: ['./order-by-id.component.sass']
})
export class OrderByIdComponent implements OnInit {

  @Input() selectedOrderId = -1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
