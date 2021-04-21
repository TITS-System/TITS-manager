import { Injectable } from '@angular/core';
import {CourierInterface} from '../../../shared/interfaces/courier.interface';
import {RestaurantService} from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  couriers: CourierInterface[] = [];

  constructor(private restaurantService: RestaurantService) { }

  async getCouriersByRestaurantId(): Promise<void> {
    //TODO get couriers by restaurant.id
    const restaurantId = this.restaurantService.getSelectedRestaurantId();
    //TODO fill couriers into array
  }
}
