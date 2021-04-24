import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourierInterface } from '../../interfaces/courier.interface';

@Component({
  selector: 'app-courier-profile',
  templateUrl: './courier-profile.component.html',
  styleUrls: ['./courier-profile.component.sass']
})
export class CourierProfileComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courier = {
      id: -1,
      isOnWork: true,
      login: '',
      username: ''
    };
  }

  private userId = -1;

  courier: { id: number, login: string, username: string, isOnWork: boolean };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadCourierInfo(this.userId);
    });
  }

  private loadCourierInfo(userId: number): void {
    const token = localStorage.getItem(`token`) || '';
    const headers = new HttpHeaders().set('auth-token', token);
    // tslint:disable-next-line:max-line-length
    this.httpClient.get(`${environment.apiUrl}/courier/getfullinfo?courierId=${userId}`, { headers })
      .subscribe((response: any) => {
        this.courier = response;
        console.log(this.courier);
      });

  }

  getWorkStatusString(isOnWork: boolean): string {
    return isOnWork ? 'On work.' : 'Resting.';
  }

  hide(): void {
    this.router.navigate(['/manager', 'couriers']);
  }
}
