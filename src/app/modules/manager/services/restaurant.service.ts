import { Injectable } from '@angular/core';
import { RestaurantInterface } from '../../../shared/interfaces/restaurant.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from 'src/app/shared/services/account.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourierInterface } from 'src/app/shared/interfaces/courier.interface';

@Injectable()
export class RestaurantService {

  postfix = 'restaurant';

  constructor(private http: HttpClient,
  ) {
  }


  selectedRestaurant: RestaurantInterface = {
    Id: 0,
    AddressString: '',
    LocationLatLng: { Lat: 0, Lng: 0 },
  };


  restaurants: RestaurantInterface[] = [];

  isRestaurantSelected(): boolean {
    return !!this.selectedRestaurant.Id || !!localStorage.getItem('restaurantId');
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


  async getAllRestaurants(): Promise<RestaurantInterface[]> {

    const token = localStorage.getItem(`token`) || "";

    const headers = new HttpHeaders().set('auth-token', token);

    this.http.get<RestaurantInterface[]>(`${environment.apiUrl}/${this.postfix}/getall`, { headers: headers }).subscribe(
      responseData => {
        this.restaurants = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );

    return this.restaurants;
  }


  async getSelectedRestaurant(): Promise<RestaurantInterface> {

    const restaurantId = this.getSelectedRestaurantId();
    const token = localStorage.getItem(`token`) || "";

    const headers = new HttpHeaders().set('auth-token', token);

    this.http.get<RestaurantInterface>(`${environment.apiUrl}/${this.postfix}/getinfo?restaurantId=${restaurantId}`, { headers: headers }).subscribe(
      responseData => {
        this.selectedRestaurant = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );

    return this.selectedRestaurant;
  }
}
