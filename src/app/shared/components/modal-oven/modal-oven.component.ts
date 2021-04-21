import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OvenModalService } from '../../services/oven-modal.service';

@Component({
  selector: 'app-modal-oven',
  templateUrl: './modal-oven.component.html',
  styleUrls: ['./modal-oven.component.sass']
})
export class ModalOvenComponent implements OnInit {

  @Output() onClose: EventEmitter<any> = new EventEmitter()

  constructor(
    public ovenModalService: OvenModalService
  ) { }

  ngOnInit(): void {
  }

}
