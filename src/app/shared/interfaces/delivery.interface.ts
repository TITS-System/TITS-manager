import { DeliveryStatus} from '../enums/delivery.enum';

export interface DeliveryInterface {
  id: number;
  orderId: number;
  courierId: number;
  startTime: string;
  endTime: string;
  status: string
}
