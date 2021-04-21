import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PackerSliderService } from '../../services/packer-slider.service';

@Component({
  selector: 'app-packer-slider-container',
  templateUrl: './packer-slider-container.component.html',
  styleUrls: ['./packer-slider-container.component.sass'],

  animations: [
    trigger('move', [
      state('start', style({'transform': 'translateX({{transform}}px)'}), {params: {transform: '0'}}),
      state('end', style({'transform': 'translateX({{transform}}px)'}), {params: {transform: '0'}}),
      
      transition('* => *', animate('400ms ease-in-out'))
    ])
  ]
})
export class PackerSliderContainerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('container') container: ElementRef | undefined

  sliderSubscription: Subscription = new Subscription

  pagesCount: number = 3
  currentPage: number = 0
  transform: string = '0'
  containerWidth: number = 0
  animationState: string = ''

  constructor(
    private _packerSliderService: PackerSliderService
  ) { }

  ngOnInit(): void {
    this.sliderSubscription = 
    this._packerSliderService.onSwipe$.subscribe(direction => {
      this.swipe(direction)
    })
  }

  ngOnDestroy(): void {
    this.sliderSubscription.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.updateContainerWidth()
  }

  updateContainerWidth(): void {
    this.containerWidth = this.container?.nativeElement.offsetWidth + 10
  }

  updateTransformValue(): void {
    this.transform = (this.currentPage * this.containerWidth * -1).toString()
  }

  swipe(direction: string): void {
    if (this.animationState != 'start') {
      console.log(this.containerWidth)
      if (direction == 'left') {
        if (this.currentPage > 0) this.currentPage--
      } else {
        if (this.currentPage < this.pagesCount - 1) this.currentPage++
      }
      
      this.updateTransformValue()
      this.animationState = 'start'

      setTimeout(() => {
        this.animationState = 'end'
      }, 410)
    }
  }

  @HostListener('window:resize')
  onDocumentResize(): void {
    this.updateContainerWidth()
    this.updateTransformValue()
  }

}
