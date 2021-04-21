import { Injectable } from '@angular/core';

@Injectable()
export class DefectModalService {

  constructor() { }

  displayModal: boolean = false

  show(): void {
      this.displayModal = true
  }

  hide(): void {
      this.displayModal = false
  }

  toggle(): void {
      this.displayModal = !this.displayModal
  }


}
