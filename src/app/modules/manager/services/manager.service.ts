import {Injectable} from '@angular/core';
import {CourierInterface} from '../../../shared/interfaces/courier.interface';
import {ManagerInterface} from '../../../shared/interfaces/managerInterface';
import {Observable} from 'rxjs';
import {AccountService} from '../../../shared/services/account.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {


  postfix = 'manager';
  // manager: any;

  // @ts-ignore
  // tslint:disable-next-line:variable-name
  private _manager: ManagerInterface;

  get manager(): ManagerInterface {
    return this._manager;
  }

  set manager(value: ManagerInterface) {
    this._manager = value;
  }

  constructor(private http: HttpClient,
              private as: AccountService) {
  }




//
// async;
// getDecksByUserId();
// :
// Promise < void > {
//
//   const token = this.cookieService.get('access_token');
//
//   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
//
//   this.http.get<Deck[]>(`/api/decks/GetDecksByUserId`, {headers: headers}).subscribe(
//     responseData => {
//       this.decks = responseData;
//     },
//     error => {
//       alert(`error: ${error.status}, ${error.statusText}`);
//     }
//   );
// };


// return this.http.get(`${environment.apiUrl}/${this.postfix}/getinfo?managerId=${this.as.managerId}`, {headers})
//   .pipe(
//     map((response: any) => {
//       this._manager = response.manager;
//     }));


// async EditManageInfo(): Promise<any> {
//   const headers = new HttpHeaders().set('Content-Type', 'application/json').append('auth-token', token);
//   this.http.post();
// }
}





