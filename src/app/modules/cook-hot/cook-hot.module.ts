import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SliderContainerComponent } from './components/slider-container/slider-container.component';
import { SliderPageComponent } from './components/slider-page/slider-page.component';
import { SliderTileComponent } from './components/slider-tile/slider-tile.component';
import { SliderTileService } from './services/slider-tile.service';



@NgModule({
  declarations: [
    SliderContainerComponent,
    SliderPageComponent,
    SliderTileComponent
  ],
  providers: [SliderTileService],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: ''}
    ])
  ],
})
export class CookHotModule { }
