import { Injectable } from '@angular/core';

@Injectable()
export class OvenModalService {

  isOpened: boolean = false

  constructor() { }

  open(): void {
    this.isOpened = true
  }

  close(): void {
    this.isOpened = false
  }
}
