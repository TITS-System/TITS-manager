import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CourierInterface } from '../../../shared/interfaces/courier.interface';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  postfix = 'courier';

  couriers: CourierInterface[] = [];

  constructor(private restaurantService: RestaurantService, private http: HttpClient) { }

  async getCouriersByRestaurantId(): Promise<CourierInterface[]> {

    const token = localStorage.getItem(`token`) || "";

    const headers = new HttpHeaders().set('auth-token', token);

    const restaurantId = localStorage.getItem('restaurantId');

    this.http.get<CourierInterface[]>(`${environment.apiUrl}/${this.postfix}/getcouriers/restaurantId=${restaurantId}`, { headers: headers }).subscribe(
      responseData => {
        this.couriers = responseData
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );

    return this.couriers;

  }
}
