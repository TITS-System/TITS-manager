import { DeliveryStatus} from '../enums/delivery.enum';

export interface DeliveryInterface {
  Id: number;
  OrderId: number;
  CourierUsername: string;
  TimeRange: {
    BeginAt: Date,
    FinishAt: Date
  };
  Status: DeliveryStatus;
}
