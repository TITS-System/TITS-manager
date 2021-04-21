import { LatLngInterface } from './latLng.interface';

export interface CourierAccountInterface{
  id: number;
  username: string;
  isOnWork: boolean;
  lastLatLng: LatLngInterface;
}
