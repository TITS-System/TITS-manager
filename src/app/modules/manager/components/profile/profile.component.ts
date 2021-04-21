import {Component, Injectable, NgModule, OnInit} from '@angular/core';
import {AccountService} from '../../../../shared/services/account.service';
import {ManagerInterface} from '../../../../shared/interfaces/managerInterface';
import {ManagerService} from '../../services/manager.service';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})


@Injectable({
  providedIn: 'root'
})
export class ProfileComponent implements OnInit {

  constructor(private as: AccountService, private ms: ManagerService, private http: HttpClient) {
  }

  // tslint:disable-next-line:variable-name
  _manager: ManagerInterface = {
    id: -1,
    login: '',
    username: ''
  };
  postfix = 'manager';

  async loadManagerInfo(): Promise<void> {

    const token = this.as.token;

    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('auth-token', token);

    console.log(headers);
    this.http.get<ManagerInterface>(`${environment.apiUrl}/${this.postfix}/getinfo?managerId=${this.as.managerId}`, {headers}).subscribe(responseData => {
        this._manager = responseData;
      },
      error => {
        alert(`errror: ${error.status}, ${error.statusText}`);
      }
    );
  }


  ngOnInit(): void {
    this.loadManagerInfo();
  }


  // loadManager(): void {
  //   this.ms.loadManagerInfo()
  //     .subscribe(() => {
  //       this._manager = this.ms.manager;
  //     }, error => {
  //       console.log(error.message);
  //     });
  // }
  //
  // getManagerUsername(): string {
  //   return this._manager.username;
}

