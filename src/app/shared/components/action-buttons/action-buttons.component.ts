import { Component, OnInit, Input } from '@angular/core';
import { WorkSessionService } from 'src/app/shared/services/worksession.service';
import { OvenModalService } from '../../services/oven-modal.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.sass']
})
export class ActionButtonsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('oven') showOvenButton = true;

  constructor(
    public ovenModalService: OvenModalService,
    public workSessionService: WorkSessionService
  ) { }

  ngOnInit(): void {
  }

}
