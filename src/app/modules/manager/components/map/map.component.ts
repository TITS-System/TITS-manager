import {Component, OnInit} from '@angular/core';

import {} from 'googlemaps';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetCouriersResultInterface} from '../../../../shared/interfaces/getCouriersResult.interface';
import {environment} from '../../../../../environments/environment';
import {CourierAccountInterface} from '../../../../shared/interfaces/courierAccount.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  private resCouriers: GetCouriersResultInterface;

  // Initialize and add the map
  initMap(): void {
    // The location of Uluru 53.241462, 34.361686
    const uluru = {lat: 53.241462, lng: 34.361686};
    // The map, centered at Uluru
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 11,
        center: uluru,
      }
    );

    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map,
    });

    this.getCouriersByRes(1, map);
  }


  getCouriersByRes(restId: number, map: any): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);

    this.httpClient.get(`${environment.apiUrl}/Courier/GetAllByRestaurant?restaurantId=${restId}`, {headers}).subscribe((response: any) => {
      this.resCouriers = response;
      console.log('hz2');
      console.log(response);
      console.log(this.resCouriers.couriers);
      this.resCouriers.couriers.forEach((e) => {
          console.log('some log');
          const marker = new google.maps.Marker({
            position: {lat: e.lastLatLng.lat, lng: e.lastLatLng.lng},
            map,
            icon: 'https://sun9-70.userapi.com/impg/BZQlbqpRhVseZCQcz8awu-sxvm-nAFaxd9ApIA/qH3ENc9W-qA.jpg?size=1541x1035&quality=96&sign=39a207fba9a6a14ebb4ccbd2f7537656&type=album'
          });
        }
      )
      ;
    });
  }


  constructor(private httpClient: HttpClient) {
    this.resCouriers = {couriers: []};
  }

  ngOnInit(): void {
    this.initMap();
  }


}
