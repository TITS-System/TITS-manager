import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackerLayoutComponent } from './components/packer-layout/packer-layout.component';
import { RouterModule } from '@angular/router';
import { AssemblyComponent } from './components/assembly/assembly.component';
import { LayoutOptionsService } from './services/layout-options.service';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PackerSwitcherComponent } from './components/packer-switcher/packer-switcher.component';
import { SliderArrowsComponent } from './components/slider-arrows/slider-arrows.component';
import { FooterActionButtonsComponent } from './components/footer-action-buttons/footer-action-buttons.component';
import { FooterDefectButtonComponent } from './components/footer-defect-button/footer-defect-button.component';
import { OrdersComponent } from './components/orders/orders.component';
import { PackerSliderContainerComponent } from './components/packer-slider-container/packer-slider-container.component';
import { PackerSliderPageComponent } from './components/packer-slider-page/packer-slider-page.component';
import { PackerSliderTileComponent } from './components/packer-slider-tile/packer-slider-tile.component';
import { PackerSliderService } from './services/packer-slider.service';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderComponent } from './components/order/order.component';
import { OrderTileComponent } from './components/order-tile/order-tile.component';
import { DefectModalComponent } from './components/defect-modal/defect-modal.component';
import { DefectModalService } from './services/defect-modal.service';


@NgModule({
  declarations: [
    PackerLayoutComponent,
    AssemblyComponent,
    PackerSwitcherComponent,
    SliderArrowsComponent,
    FooterActionButtonsComponent,
    FooterDefectButtonComponent,
    OrdersComponent,
    PackerSliderContainerComponent,
    PackerSliderPageComponent,
    PackerSliderTileComponent,
    OrderItemComponent,
    OrderComponent,
    OrderTileComponent,
    DefectModalComponent
  ],
  providers: [LayoutOptionsService, PackerSliderService, DefectModalService],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: PackerLayoutComponent, children: [
      {path: '', component: AssemblyComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'order/:id', component: OrderComponent},
    ]}])
  ],

})
export class PackerModule { }
