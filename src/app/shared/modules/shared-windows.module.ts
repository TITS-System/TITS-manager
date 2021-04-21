import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderByIdComponent} from '../components/order-by-id/order-by-id.component';



@NgModule({
  declarations: [OrderByIdComponent],
  imports: [
    CommonModule
  ],
  exports: [OrderByIdComponent]
})
export class SharedWindowsModule { }
