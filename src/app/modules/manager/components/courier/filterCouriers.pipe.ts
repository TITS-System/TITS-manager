import {Pipe, PipeTransform} from '@angular/core';
import {CourierInterface} from '../../../../shared/interfaces/courier.interface';

@Pipe({
  name: 'filterCouriers'
})
export class FilterCouriersPipe implements PipeTransform {

  transform = (couriers: any, searchValue: string): any => {
    if (!searchValue) {
      return couriers;
    }

    return couriers.filter((c: CourierInterface) =>
      c.Id.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      c.Username.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  };

}
