import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-slider-tile',
  templateUrl: './slider-tile.component.html',
  styleUrls: ['./slider-tile.component.sass']
})
export class SliderTileComponent implements OnInit {

  @Input() product: Product = {title: ''}

  constructor() { }

  ngOnInit(): void {
  }

}
