import { Component, OnInit } from '@angular/core';
import { PackerSliderService } from '../../services/packer-slider.service';

@Component({
  selector: 'app-slider-arrows',
  templateUrl: './slider-arrows.component.html',
  styleUrls: ['./slider-arrows.component.sass']
})
export class SliderArrowsComponent implements OnInit {

  constructor(
    private _packerSliderSerice: PackerSliderService
  ) { }

  ngOnInit(): void {
    
  }

  swipe(direction: string) {
    this._packerSliderSerice.swipe(direction)
  }

}
