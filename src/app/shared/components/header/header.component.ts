import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';
import { WorkSessionService } from 'src/app/shared/services/worksession.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('timers') displayTimers = true;

  showMenu = false;
  currentTime: number = new Date().getTime();

  // tslint:disable-next-line:new-parens
  updateTimeIntervalSubscription: Subscription = new Subscription;
  updateTimeInterval$ = interval(1000);

  constructor(
    public accountService: AccountService,
    public workSessionService: WorkSessionService
  ) { }

  ngOnInit(): void {

    this.workSessionService.updateSessionDuration();

    this.updateTimeIntervalSubscription =
    this.updateTimeInterval$.subscribe(() => {
      this.currentTime = new Date().getTime();
    });

  }

  ngOnDestroy(): void {
    this.updateTimeIntervalSubscription.unsubscribe();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

}
