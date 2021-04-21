import {Injectable} from '@angular/core';
import {RestaurantInterface} from '../../../shared/interfaces/restaurant.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccountService} from 'src/app/shared/services/account.service';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CourierInterface} from 'src/app/shared/interfaces/courier.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class RestaurantService {

  postfix = 'restaurant';

  constructor(private http: HttpClient,
              private as: AccountService
  ) {
  }


  selectedRestaurant: RestaurantInterface = {
    id: 0,
    addressString: '',
    locationLatLng: {Lat: 0, Lng: 0},
  };


  restaurants: RestaurantInterface[] = [];

  isRestaurantSelected(): boolean {
    console.log(this.selectedRestaurant.id);
    console.log(this.selectedRestaurant.addressString);

    // tslint:disable-next-line:triple-equals
    return !!localStorage.getItem('restaurantId') && localStorage.getItem('restaurant_address') != '';
  }


  getSelectedRestaurantId(): number {
    if (this.selectedRestaurant.id) {
      return this.selectedRestaurant.id;
    } else if (!!localStorage.getItem('restaurantId')) {
      // @ts-ignore
      return +localStorage.getItem(`restaurantId`);
    }

    return 0;
  }


  getAllRestaurants(): Observable<any> {

    const token = this.as.token;
    console.log(token);

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('auth-token', token);


    // @ts-ignore
    return this.http.get(`${environment.apiUrl}/${this.postfix}/getall`, {headers})
      .pipe(
        map((restaurants: any) => {
            this.restaurants = restaurants.restaurants;
            console.log(this.restaurants);
        })
      );
    // tslint:disable-next-line:max-line-length
    // const response = await this.http.get<{ restaurants: RestaurantInterface[] }>(`${environment.apiUrl}/${this.postfix}/getall`, {headers}).toPromise();



    // this.restaurants = response.restaurants;

    // return this.restaurants;
  }


  getSelectedRestaurant(): RestaurantInterface {

    const restaurantId = this.getSelectedRestaurantId();
    const token = localStorage.getItem(`token`) || '';

    const headers = new HttpHeaders().set('auth-token', token);

    this.http.get<RestaurantInterface>(`${environment.apiUrl}/${this.postfix}/getinfo?restaurantId=${restaurantId}`, {headers}).subscribe(
      responseData => {
        this.selectedRestaurant = responseData;
      },
      error => {
        alert(`error: ${error.status}, ${error.statusText}`);
      }
    );

    return this.selectedRestaurant;
  }
}
