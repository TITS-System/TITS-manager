import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkSessionService } from 'src/app/shared/services/worksession.service';
import { OvenModalService } from '../../../../shared/services/oven-modal.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.sass']
})
export class InterfaceComponent implements OnInit, OnDestroy {

  constructor(
    public ovenModalService: OvenModalService,
    public workSessionService: WorkSessionService
  ) { }

  ngOnInit(): void {

    this.workSessionService.updatePauseTime();

  }

  ngOnDestroy(): void {
  }


}
