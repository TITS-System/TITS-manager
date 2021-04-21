import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.sass']
})
export class OrderTileComponent implements OnInit {

  isPacked: boolean = true
  displayModal: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
