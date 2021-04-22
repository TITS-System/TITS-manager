import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {SharedModule} from '../../shared/modules/shared.module';
import {RouterModule} from '@angular/router';
import {CouriersMapComponent} from './components/couriers-map/couriers-map.component';
import {CourierComponent} from './components/courier/courier.component';
import {RestaurantComponent} from './components/restaurant/restaurant.component';
import {OrderComponent} from './components/order/order.component';
import {ProfileComponent} from './components/profile/profile.component';
import {DeliveryComponent} from './components/delivery/delivery.component';
import {RestaurantService} from './services/restaurant.service';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {FilterCouriersPipe} from './components/courier/filterCouriers.pipe';
import {DeliveryStatus} from '../../shared/enums/delivery.enum';
import {MatCardModule} from '@angular/material/card';
import {CustomDatePipe} from '../../shared/pipes/date.pipe';
import {MatIconModule} from '@angular/material/icon';
import {SharedWindowsModule} from '../../shared/modules/shared-windows.module';
import {DeliveryInfoMapComponent} from './components/delivery-info-map/delivery-info-map.component';


@NgModule({
  declarations: [
    NavMenuComponent,
    RestaurantComponent,
    CouriersMapComponent,
    DeliveryInfoMapComponent,
    CourierComponent,
    OrderComponent,
    DeliveryComponent,
    ProfileComponent,
    FilterCouriersPipe
  ],
  providers: [RestaurantService, CustomDatePipe],
  imports: [
    SharedWindowsModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: NavMenuComponent, children: [
          {path: 'map', component: DeliveryInfoMapComponent},
          {path: 'couriers', component: CourierComponent},
          {path: 'orders', component: OrderComponent},
          {path: 'deliveries', component: DeliveryComponent},
          {path: 'profile', component: ProfileComponent},
        ]
      },
      {
        path: 'restaurants', component: RestaurantComponent
      }
    ]),
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ManagerModule {
}
