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

  selectedRestaurant: RestaurantInterface = {id: 0, addressString: '', locationLatLng: undefined};

  constructor(private router: Router, private restaurantService: RestaurantService) {
  }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    // this.restaurants = await this.restaurantService.getAllRestaurants();
    this.restaurantService.getAllRestaurants()
      .subscribe(() => {
        this.restaurants = this.restaurantService.restaurants;
      }, error => {
        this.router.navigate(['/auth']);
      });
    console.log(this.restaurants);
  }

  getSelectedRestaurant(): void {
    this.selectedRestaurant = this.restaurantService.getSelectedRestaurant();
  }

  manageRestaurant(restaurantId: number, restaurantAddress: string): void {
    localStorage.setItem('restaurantId', String(restaurantId));
    this.restaurantService.selectedRestaurant.id = restaurantId;
    localStorage.setItem('restaurant_address', restaurantAddress);

    this.router.navigate(['/manager', 'map']);

  }

}
