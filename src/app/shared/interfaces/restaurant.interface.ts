// import LatLng = google.maps.LatLng;

export interface RestaurantInterface {
  id: number;
  addressString: string;
  locationLatLng?: { Lat: number, Lng: number };
}
