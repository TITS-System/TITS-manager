import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestaurantService} from '../../services/restaurant.service';
import {RestaurantInterface} from '../../../../shared/interfaces/restaurant.interface';

export interface IRestaurant extends RestaurantInterface {
  isActivated: boolean;
}

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.sass']
})
export class RestaurantComponent implements OnInit {

  restaurants: IRestaurant[] = [];


  constructor(private router: Router, private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.getRestaurants();

    // TEST DATA
    this.restaurants = [
      {
        Id: 331231,
        AddressString: 'DoDo Pizza on ул. Карла Маркса д.5',
        LocationLatLng: {
          Lat: 1231231,
          Lng: 894572965
        },
        isActivated: true
      },
      {
        Id: 356231,
        AddressString: 'DoDo Pizza on ул. Ленина д.3',
        LocationLatLng: {
          Lat: 12321231,
          Lng: 8427296523
        },
        isActivated: false
      },
    ];
  }

  getRestaurants(): void {
    //TODO get all restaurants and fill array with data
  }

  manageRestaurant(restaurantId: number): void {
    localStorage.setItem('restaurantId', String(restaurantId));
    this.restaurantService.selectedRestaurant.Id = restaurantId;
    this.router.navigate(['/manager', 'map']);
  }

}
