import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {RestaurantService} from '../../services/restaurant.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.sass']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private router: Router,
    public restaurantService: RestaurantService,
    private routerModule: RouterModule
  ) {

  }

  ngOnInit(): void {
    if (this.restaurantService.isRestaurantSelected()) {
      // this.router.navigate(['/manager', 'map']);
      return;
    }

    this.router.navigate(['/manager', 'restaurants']);
  }

   getSelectedRestaurantAddress(): string {
    return localStorage.getItem('restaurant_address') || '';
  }

  changeRestaurant(): void {
    localStorage.removeItem('restaurant_address');
    localStorage.removeItem('restaurantId');
    this.router.navigate(['/manager', 'restaurants']);
  }
}
