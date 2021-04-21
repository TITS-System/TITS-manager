import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsPage } from '../../interfaces/products-page.interface';

@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.sass'],

  animations: [
    trigger('move', [
      state('start', style({transform: 'translateX({{transform}}px)'}), {params: {transform: '0'}}),
      state('end', style({transform: 'translateX({{transform}}px)'}), {params: {transform: '0'}}),

      transition('* => *', animate('400ms ease-in-out'))
    ])
  ]
})
export class SliderContainerComponent implements OnInit, AfterViewInit {

  // временно пока у нас нет структуры заказа и продукта

  @Input('order') orderId = 0;

  @ViewChild('container') container: ElementRef | undefined;
  @Input() products: Product[] = [
    {title: 'Суп с 1'},
    {title: 'Суп с 2'},
    {title: 'Суп с 3'},
    {title: 'Суп с 4'},
    {title: 'Суп с 5'},
    {title: 'Суп с 6'},

    {title: 'Суп с 7'},
    {title: 'Суп с 8'},
    {title: 'Суп с 9'},
    {title: 'Суп с 10'},
    {title: 'Суп с 11'},
    {title: 'Суп с 12'},

    {title: 'Суп с 13'},
    {title: 'Суп с 14'},
    {title: 'Суп с 15'},
    {title: 'Суп с 16'},
    {title: 'Суп с 17'},
    {title: 'Суп с 18'},

    {title: 'Суп с 19'},
  ];

  pagesCount: number = Math.ceil(this.products.length / 6);
  currentPage = 0;
  animationState = '';
  transform = '0';
  containerWidth = 0;

  pages: ProductsPage[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.pagesCount; i++) {
      this.pages.push({products: this.products.slice(i * 6, (i + 1) * 6)});
    }
  }

  ngAfterViewInit(): void {
    this.updateContainerWidth();
  }

  updateContainerWidth(): void {
    this.containerWidth = this.container?.nativeElement.offsetWidth + 10;
  }

  updateTransformValue(): void {
    this.updateContainerWidth();
    this.transform = (this.currentPage * this.containerWidth * -1).toString();
  }

  swipe(direction: string): void {
    // tslint:disable-next-line:triple-equals
    if (this.animationState != 'start') {
      console.log('worked');
      if (direction == 'left') {
        if (this.currentPage > 0) { this.currentPage--; }
      } else {
        if (this.currentPage < this.pagesCount - 1) { this.currentPage++; }
      }

      this.updateTransformValue();
      this.animationState = 'start';

      setTimeout(() => {
        this.animationState = 'end';
      }, 410);
    }
  }

  onAnimationDone(): void {
    // if (this.animationState == 'start') {
    //   this.animationState = 'end'
    //   console.log('finished')
    // }
  }

  @HostListener('window:resize')
  onDocumentResize(): void {
    this.updateContainerWidth();
    this.updateTransformValue();
  }

}
