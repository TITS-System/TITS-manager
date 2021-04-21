import {Component, OnInit} from '@angular/core';

import {} from 'googlemaps';
import {HttpClient} from '@angular/common/http';
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
    this.httpClient.get(`${environment.apiUrl}/Courier/GetAllByRestaurant?restaurantId=${restId}`).subscribe((response: any) => {
      this.resCouriers = response;
      this.resCouriers.Couriers.forEach((e) => {
          console.log('some log');
          const marker = new google.maps.Marker({
            position: {lat: e.LastLatLng.Lat, lng: e.LastLatLng.Lng},
            map,
          });
        }
      )
      ;
    });
  }


  constructor(private httpClient: HttpClient) {
    this.resCouriers = {Couriers: []};
  }

  ngOnInit(): void {
    this.initMap();
  }


}
