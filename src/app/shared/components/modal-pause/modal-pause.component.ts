import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { WorkSessionService } from 'src/app/shared/services/worksession.service';

@Component({
  selector: 'app-modal-pause',
  templateUrl: './modal-pause.component.html',
  styleUrls: ['./modal-pause.component.sass']
})
export class ModalPauseComponent implements OnInit {

  constructor(
    public workSessionService: WorkSessionService,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

}
