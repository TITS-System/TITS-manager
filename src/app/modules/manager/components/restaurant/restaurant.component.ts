import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestaurantService} from '../../services/restaurant.service';
import {RestaurantInterface} from '../../../../shared/interfaces/restaurant.interface';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.sass']
})
export class RestaurantComponent implements OnInit {

  restaurants: RestaurantInterface[] = [];

  selectedRestaurant: RestaurantInterface = {Id: 0, AddressString: '', LocationLatLng: {Lat: 0, Lng: 0}};

  constructor(private router: Router, private restaurantService: RestaurantService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getRestaurants();
    // localStorage.setItem('restaurant_address', JSON.stringify(this.selectedRestaurant.AddressString));
  }

  // this.selectedRestaurant.AddressString - БРАТЬ ОТСЮДА

  async getRestaurants(): Promise<void> {
    this.restaurants = await this.restaurantService.getAllRestaurants();
  }

  async getSelectedRestaurant(): Promise<void> {
    this.selectedRestaurant = await this.restaurantService.getSelectedRestaurant();
  }

  manageRestaurant(restaurantId: number): void {
    localStorage.setItem('restaurantId', String(restaurantId));
    this.restaurantService.selectedRestaurant.Id = restaurantId;
    localStorage.setItem('restaurant_address', JSON.stringify(this.selectedRestaurant.AddressString));
    this.router.navigate(['/manager', 'map']);

  }

}
