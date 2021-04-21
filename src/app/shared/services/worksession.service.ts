import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class WorkSessionService {


    //#region Переменные

    // переменные для запросов
    private _postfix = 'WorkerSession';

    // переменные таймера
    private _pauseTimerInterval$ = interval(1000);
    private _pauseTimerIntervalSubscription: Subscription = new Subscription;

    private _sessionTimerInterval$ = interval(1000);
    private _sessionTimerIntervalSubscription: Subscription = new Subscription;

    // переменные смены
    sessionDuration = 0;

    // переменные паузы
    private _isOnPause = false;
    isOnPauseSubject$: Subject<boolean> = new Subject<boolean>();
    pauseTime = 0;

    //#endregion

    constructor(
        private _httpClient: HttpClient
    ) {}

    //#region Пауза

    // обновить время паузы
    updatePauseTime(): void {
        this._httpClient.get(`${environment.apiUrl}/${this._postfix}/getCurrentPauseDuration`)
        .subscribe((response: any) => {
            // todo
            if (response.time != -1) {
                this.isOnPause = true;

                this.pauseTime = response.time;

                this.startPauseTimerUpdating();
            } else {
                this.isOnPause = false;
            }
        },
        error => {
            console.error('updatePauseTime()', error);
        });
    }

    // аксессоры isOnPause
    get isOnPause(): boolean {
        return this._isOnPause;
    }

    set isOnPause(newState: boolean) {
        this._isOnPause = newState;
        this.isOnPauseSubject$.next(newState);
    }

    // начать клиентский таймер паузы
    startPauseTimerUpdating(): void {
        // очистить старую подписку на таймер
        this.stopPauseTimerUpdating();

        this._pauseTimerIntervalSubscription =
        this._pauseTimerInterval$.subscribe(() => {
            this.pauseTime++;
        });
    }

    // отписаться от клиентского таймера
    stopPauseTimerUpdating(): void {
        this._pauseTimerIntervalSubscription.unsubscribe();
    }

    // паузы смены
    pauseWork(): void {
        this._httpClient.get(`${environment.apiUrl}/${this._postfix}/pause`)
        .subscribe(() => {
            this.pauseTime = 0;
            this.isOnPause = true;
            this.startPauseTimerUpdating();
        },
        error => {
            console.error('pauseWork()', error);
        });

    }

    // продолжить смену
    continueWork(): void {
        this._httpClient.get(`${environment.apiUrl}/${this._postfix}/unpause`)
        .subscribe(() => {
            this.isOnPause = false;
            this.stopPauseTimerUpdating();
        },
        error => {
            console.error('continueWork()', error);
        });
    }

    //#endregion

    //#region Смена

    updateSessionDuration(): void {
        this._httpClient.get(`${environment.apiUrl}/${this._postfix}/getcurrentworksessionduration`)
        .subscribe((response: any) => {
            this.sessionDuration = response.time;
            this.startSessionTimerUpdating();
        }, (error) => {
            console.error('updateSessionDuration()', error);
        });

    }

    // обновлять клиентский таймер смены
    startSessionTimerUpdating(): void {

        this.stopSessionTimerUpdating();

        this._sessionTimerIntervalSubscription =
        this._sessionTimerInterval$.subscribe(() => {
            this.sessionDuration++;
        });
    }

    // отписаться от обновления таймера смены
    stopSessionTimerUpdating(): void {
        this._sessionTimerIntervalSubscription.unsubscribe();
    }

    // начать смену
    beginSession(): Observable<any> {
        return this._httpClient.get(`${environment.apiUrl}/${this._postfix}/begin`);
    }

    // закончить смену TODO
    closeSession(): Observable<any> {
        return this._httpClient.get(`${environment.apiUrl}/${this._postfix}/close`);
    }

    //#endregion
}
