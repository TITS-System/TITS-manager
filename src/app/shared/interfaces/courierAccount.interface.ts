import { LatLngInterface } from './latLng.interface';

export interface CourierAccountInterface{
  Id: number;
  Username: string;
  IsOnWork: boolean;
  LastLatLng: LatLngInterface;
}
