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

  constructor(private httpClient: HttpClient,
              // tslint:disable-next-line:variable-name
              private _restaurantService: RestaurantService
  ) {
    this.resCouriers = {couriers: []};
  }

  private resCouriers: GetCouriersResultInterface;

  private defaultCourierIconUrl = './assets/icons/point.svg';

  private defaultRestaurantIconUrl = './assets/icons/restaurant-icon_3.svg';

  private mapCenter = {lat: 53.241462, lng: 34.361686};

  private baseZoom = 11;

  private courierMarkers: { courier: CourierAccountInterface, marker: google.maps.Marker }[] = [];

  // The marker, positioned at Uluru
  private restaurantMarker?: google.maps.Marker;

  private map?: google.maps.Map;

  private isSelected = false;

  isHidden = true;

  modalMenuBtnLocationTop = 25;
  modalMenuBtnLocationRight = 25;
  modalMenuLocationRight = '-100';
  modalMenuLocationTop = 0;

  corsToShowInModal: CourierAccountInterface[] = [];

  getCouriersByRestaurant(restaurantId: number, map: any): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('auth-token', token);

    // tslint:disable-next-line:max-line-length
    this.httpClient.get(`${environment.apiUrl}/Courier/MGetAllByRestaurant?restaurantId=${restaurantId}`, {headers})
      .subscribe((response: any) => {
          this.resCouriers = response;

          this.courierMarkers.forEach(pair => {
            pair.marker.setMap(null);
          });
          this.courierMarkers = [];

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
          this.performMarkerScaling();
        }
      );
  }


  openModalForCourier(courier: CourierAccountInterface): void {
    this.corsToShowInModal = this.resCouriers.couriers.filter(c => c.id === courier.id);
    this.isSelected = true;
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
      this.updateCorToShow();
      console.log('Reload');
    }, 3000);
  }

  private updateCorToShow(): void {
    if (!this.isSelected) {
      this.corsToShowInModal = this.resCouriers.couriers;
    }
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

  toggleModalMenu(): void {
    if (this.isHidden) {
      this.showModalMenu();
    } else {
      this.isSelected = false;
      this.hideModalMenu();
    }

    this.isHidden = !this.isHidden;
  }

  showModalMenu(): void {
    this.modalMenuBtnLocationRight = 150;
    this.modalMenuLocationRight = '0';
  }

  hideModalMenu(): void {
    this.modalMenuBtnLocationRight = 25;
    this.modalMenuLocationRight = '-100';
  }

  getWorkStatusString(isOnWork: boolean): string {
    return isOnWork ? 'On work.' : 'Resting.';
  }
}
