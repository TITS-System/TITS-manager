import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import {OrderByIdComponent} from '../components/order-by-id/order-by-id.component';
import {CourierProfileComponent} from '../components/courier-profile/courier-profile.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [OrderByIdComponent, CourierProfileComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [OrderByIdComponent, CourierProfileComponent]
})
export class SharedWindowsModule { }
