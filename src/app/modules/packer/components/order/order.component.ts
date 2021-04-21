import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutOptionsService } from '../../services/layout-options.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit, OnDestroy {

  constructor(
    private options: LayoutOptionsService
  ) { }

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.options.displayFooterDefectButton = true
      this.options.displayHeaderBackButton = true
    })
  }

  ngOnDestroy(): void {
    this.options.resetOptions()
  }

}
