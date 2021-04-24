import {Component, OnInit} from '@angular/core';

import {} from 'googlemaps';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GetCouriersResultInterface} from '../../../../shared/interfaces/getCouriersResult.interface';
import {environment} from '../../../../../environments/environment';
import {CourierAccountInterface} from '../../../../shared/interfaces/courierAccount.interface';
import {RestaurantService} from '../../services/restaurant.service';
import {OrderInterface} from '../../../../shared/interfaces/order.interface';

@Component({
  selector: 'app-map',
  templateUrl: './zone-map.component.html',
  styleUrls: ['./zone-map.component.sass']
})
export class ZoneMapComponent implements OnInit {
  private latLngsDto: { latLngs: { lat: number, lng: number }[] };

  private defaultCourierIconUrl = './assets/icons/point.svg';

  private defaultRestaurantIconUrl = './assets/icons/restaurant-icon_3.svg';

  private mapCenter = {lat: 53.241462, lng: 34.361686};

  private baseZoom = 11;

  // The marker, positioned at Uluru
  private restaurantMarker?: google.maps.Marker;

  private map?: google.maps.Map;

  loadZone(map: any): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(`${environment.apiUrl}/restaurant/getzone?restaurantid=${this._restaurantService.getSelectedRestaurantId()}`, {headers})
      .subscribe((response: any) => {
        this.latLngsDto = response;

        console.table(this.latLngsDto.latLngs);

        const paths = this.latLngsDto.latLngs.map(dto => {
          return new google.maps.LatLng(dto.lat, dto.lng);
        });

        const polygon = new google.maps.Polygon({
          paths,
          geodesic: true,
          strokeColor: '#FF008A',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          editable: true,
          map
        });

        // do scale
        this.performMarkerScaling();
      });
  }

  // TODO: POST void to 'restaurant/setzone'

  constructor(private httpClient: HttpClient,
              // tslint:disable-next-line:variable-name
              private _restaurantService: RestaurantService
  ) {
    this.latLngsDto = {latLngs: [{lat: 0, lng: 0}]};
  }

  performMarkerScaling(): void {
    const scaleFactor = ((this.map?.getZoom() ?? 0) - 3) / this.baseZoom;

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
    this.loadZone(this.map);
  }
}
