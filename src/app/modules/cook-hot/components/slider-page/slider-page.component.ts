import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.sass']
})
export class SliderPageComponent implements OnInit {

  @Input() products: Product[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
