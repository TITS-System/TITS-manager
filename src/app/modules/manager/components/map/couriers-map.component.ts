import {Component, OnInit} from '@angular/core';

import {} from 'googlemaps';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetCouriersResultInterface} from '../../../../shared/interfaces/getCouriersResult.interface';
import {environment} from '../../../../../environments/environment';
import {CourierAccountInterface} from '../../../../shared/interfaces/courierAccount.interface';

@Component({
  selector: 'app-map',
  templateUrl: './couriers-map.component.html',
  styleUrls: ['./couriers-map.component.sass']
})
export class CouriersMapComponent implements OnInit {
  private resCouriers: GetCouriersResultInterface;

  private defaultCourierIconUrl = './assets/icons/point.svg';

  private defaultRestaurantIconUrl = './assets/icons/restaurant-icon_3.svg';

  private mapCenter = {lat: 53.241462, lng: 34.361686};

  private baseZoom = 11;

  private courierMarkers: google.maps.Marker[] = [];
  // The marker, positioned at Uluru
  private restaurantMarker?: google.maps.Marker;

  private map?: google.maps.Map;

  // Initialize and add the map
  initMap(): void {
    this.restaurantMarker = new google.maps.Marker({
      position: this.mapCenter,
      map: this.map,
      icon: {
        url: this.defaultRestaurantIconUrl,
        anchor: new google.maps.Point(35, 35),
        scaledSize: new google.maps.Size(70, 70)
      }
    });
    this.getCouriersByRestaurant(1, this.map);
  }


  getCouriersByRestaurant(restaurantId: number, map: any): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);

    // tslint:disable-next-line:max-line-length
    this.httpClient.get(`${environment.apiUrl}/Courier/GetAllByRestaurant?restaurantId=${restaurantId}`, {headers})
      .subscribe((response: any) => {
        this.resCouriers = response;
        this.resCouriers.couriers.forEach((e) => {
            const marker = new google.maps.Marker({
              position: {lat: e.lastLatLng.lat, lng: e.lastLatLng.lng},
              map,
              icon: {
                url: this.defaultCourierIconUrl,
                anchor: new google.maps.Point(29, 29)
              }
            });
            this.courierMarkers.push(marker);
          }
        );
      });
  }


  constructor(private httpClient: HttpClient) {
    this.resCouriers = {couriers: []};
  }

  ngOnInit(): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: this.baseZoom,
        center: this.mapCenter,
      }
    );
    this.initMap();
    this.map?.addListener('zoom_changed', () => {
      const scaleFactor = ((this.map?.getZoom() ?? 0) - 3) / this.baseZoom;
      this.courierMarkers.forEach((m) => {
        m.setIcon({
          url: this.defaultCourierIconUrl,
          anchor: new google.maps.Point(29 * scaleFactor, 29 * scaleFactor),
          scaledSize: new google.maps.Size(58 * scaleFactor, 58 * scaleFactor)
        });
      });
      this.restaurantMarker?.setIcon({
        url: this.defaultRestaurantIconUrl,
        anchor: new google.maps.Point(35 * scaleFactor, 35 * scaleFactor),
        scaledSize: new google.maps.Size(70 * scaleFactor, 70 * scaleFactor)
      });
    });
  }
}
