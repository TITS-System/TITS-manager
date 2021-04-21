import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-order-by-id',
  templateUrl: './order-by-id.component.html',
  styleUrls: ['./order-by-id.component.sass']
})
export class OrderByIdComponent implements OnInit {


  constructor() {
  }

  @Input() selectedOrderId = -1;

  @Output() isHidden = new EventEmitter<void>();

  ngOnInit(): void {
  }

  hide(): void {
    this.isHidden.emit();
  }
}
