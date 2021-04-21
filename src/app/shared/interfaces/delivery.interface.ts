import { DeliveryStatus} from '../enums/delivery.enum';

export interface DeliveryInterface {
  Id: number;
  OrderId: number;
  CourierUsername: string;
  TimeRange: {
    BeginAt: number,
    FinishAt: number
  };
  Status: DeliveryStatus;
}
