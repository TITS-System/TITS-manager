import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { OvenModalService } from '../../../../shared/services/oven-modal.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.sass']
})
export class ActionsComponent implements OnInit {

  constructor(
    public ovenModalService: OvenModalService,
    public accountService: AccountService,
    ) { }

  ngOnInit(): void {
  }

}
