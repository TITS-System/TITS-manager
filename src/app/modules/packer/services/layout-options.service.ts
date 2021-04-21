import { Injectable } from '@angular/core';

@Injectable()
export class LayoutOptionsService {

  constructor() { }

  displayHeaderBackButton: boolean = false
  displayFooterArrows: boolean = false
  displayFooterAssemblyButtons: boolean = false
  displayFooterDefectButton: boolean = false

  resetOptions(): void {
    this.displayHeaderBackButton = false
    this.displayFooterArrows = false
    this.displayFooterAssemblyButtons = false
    this.displayFooterDefectButton = false
  }


}
