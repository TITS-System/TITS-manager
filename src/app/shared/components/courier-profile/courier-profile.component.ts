import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourierInterface} from '../../interfaces/courier.interface';

@Component({
  selector: 'app-courier-profile',
  templateUrl: './courier-profile.component.html',
  styleUrls: ['./courier-profile.component.sass']
})
export class CourierProfileComponent implements OnInit {


  constructor() {
  }

  private userId = -1;

  courier: CourierInterface;

  ngOnInit(): void {
    // TODO
    // this.courier =

    this.courier = this.getCourierById(this.userId);
  }

  private getCourierById(userId: number): CourierInterface {
    // TODO
  }

  getStatusString() {

  }
}
