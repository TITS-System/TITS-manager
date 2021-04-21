import {Injectable} from '@angular/core';
import {RestaurantInterface} from '../../../shared/interfaces/restaurant.interface';

@Injectable()
export class RestaurantService {

  constructor() {

  }

  selectedRestaurant: RestaurantInterface = {
    Id: 0,
    AddressString: '',
    LocationLatLng: {Lat: 0, Lng: 0}
  };

  isRestaurantSelected(): boolean {
    // return !!this.selectedRestaurant.Id || !!localStorage.getItem('restaurantId');
    // return !!this.selectedRestaurant.id;
    return true;
  }

  getSelectedRestaurantId(): number {
    if (this.selectedRestaurant.Id) {
      return this.selectedRestaurant.Id;
    } else if (!!localStorage.getItem('restaurantId')) {
      // @ts-ignore
      return +localStorage.getItem(`restaurantId`);
    }

    return 0;
  }

  getSelectedRestaurantAddress(): string {
    const restaurantId = this.getSelectedRestaurantId();
    //TODO get request to retrieve addressString by restaurant.id

    let response = 'DoDo Pizza on ул. Карла Маркса д.5';

    response = (response.length > 45) ? response.substr(0, 44) + '...' : response;

    return response;
  }
}
