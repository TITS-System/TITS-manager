import { DeliveryStatus} from '../enums/delivery.enum';

export interface DeliveryInterface {
  id: number;
  orderId: number;
  courierId: number;
  courierUsername: string;
  startTime: string;
  endTime?: string;
  status: string
}
