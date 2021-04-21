import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceComponent } from './components/interface/interface.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { MaterialSharedModule } from 'src/app/shared/modules/material-shared.module';
import { RouterModule } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { OvenModalService } from '../../shared/services/oven-modal.service';



@NgModule({
  declarations: [
    InterfaceComponent,
    ActionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialSharedModule,
    RouterModule.forChild([
      {path: '', component: InterfaceComponent}
    ])
  ],
  providers: [OvenModalService]
})
export class CourierMapModule { }
