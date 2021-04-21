import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {SharedModule} from '../../shared/modules/shared.module';
import {RouterModule} from '@angular/router';
import {MapComponent} from './components/map/map.component';
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


@NgModule({
  declarations: [
    NavMenuComponent,
    RestaurantComponent,
    MapComponent,
    CourierComponent,
    OrderComponent,
    DeliveryComponent,
    ProfileComponent
  ],
  providers: [RestaurantService],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: NavMenuComponent, children: [
          {path: 'map', component: MapComponent},
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
    MatSlideToggleModule
  ]
})
export class ManagerModule {
}
