import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ModalPauseComponent} from '../components/modal-pause/modal-pause.component';
import {OvenModalService} from '../services/oven-modal.service';


@NgModule({
  declarations: [
    ModalPauseComponent,
  ],

  providers: [OvenModalService],

  imports: [CommonModule, HttpClientModule],

  exports: [
    CommonModule,
    HttpClientModule,
    ModalPauseComponent,
  ]
})

export class SharedModule {

}
