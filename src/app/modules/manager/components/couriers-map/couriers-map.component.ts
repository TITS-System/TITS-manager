import {Component, OnInit} from '@angular/core';

import {} from 'googlemaps';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetCouriersResultInterface} from '../../../../shared/interfaces/getCouriersResult.interface';
import {environment} from '../../../../../environments/environment';
import {CourierAccountInterface} from '../../../../shared/interfaces/courierAccount.interface';
import {RestaurantService} from '../../services/restaurant.service';

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

  private courierMarkers?: [{ courier: CourierAccountInterface, marker: google.maps.Marker }];
  // The marker, positioned at Uluru
  private restaurantMarker?: google.maps.Marker;

  private map?: google.maps.Map;

  getCouriersByRestaurant(restaurantId: number, map: any): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);

    // tslint:disable-next-line:max-line-length
    this.httpClient.get(`${environment.apiUrl}/Courier/GetAllByRestaurant?restaurantId=${restaurantId}`, {headers})
      .subscribe((response: any) => {
        this.resCouriers = response;

        const oldMarkers = [...this?.courierMarkers ?? []];

        // clear
        if (this.courierMarkers != null) {
          // @ts-ignore
          this.courierMarkers.length = 0;
        }

        let i = 0;
        this.resCouriers.couriers.forEach((courier) => {
            const marker = new google.maps.Marker({
              position: {lat: courier.lastLatLng.lat, lng: courier.lastLatLng.lng},
              map,
              icon: {
                url: this.defaultCourierIconUrl,
                anchor: new google.maps.Point(29, 29)
              },
              title: courier.username,
              clickable: true
            });

            this.courierMarkers?.push({courier, marker});

            const localCourier = courier;
            google.maps.event.addListener(marker, 'click', () => {
              this.openModalForCourier(localCourier);
            });
          }
        );
        // do scale
        this.performMarkerScaling();

        // inbind from map
        oldMarkers.forEach(pair => {
          pair.marker.setMap(null);
        });
      });
  }

  openModalForCourier(courier: CourierAccountInterface): void {
    // TODO: OPEN MODAL
  }

  constructor(private httpClient: HttpClient,
              // tslint:disable-next-line:variable-name
              private _restaurantService: RestaurantService
  ) {
    this.resCouriers = {couriers: []};
  }

  performMarkerScaling(): void {
    const scaleFactor = ((this.map?.getZoom() ?? 0) - 3) / this.baseZoom;
    this.courierMarkers?.forEach((pair) => {
      pair.marker.setIcon({
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
      this.performMarkerScaling();
    });

    setInterval(() => {
      this.getCouriersByRestaurant(this._restaurantService.getSelectedRestaurantId(), this.map);
      console.log('Reload');
    }, 3000);
  }

  // Initialize and add the couriers-map
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
    this.getCouriersByRestaurant(this._restaurantService.getSelectedRestaurantId(), this.map);
  }
}
