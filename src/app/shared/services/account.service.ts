import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {loginDTO} from '../interfaces/loginDto.interface';
import {Role} from '../interfaces/role.interface';
import {WorkSessionService} from './worksession.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  postfix = 'manager';

  private _userRoles: Role[] = [];
  private _token: string = '';
  private _managerId: string = '';

  get userRoles(): Role[] {
    return this._userRoles;
  }

  set userRoles(userRoles: Role[]) {
    this._userRoles = userRoles;
  }

  constructor(
    private _httpClient: HttpClient,
    private _workSessionService: WorkSessionService,
    private router: Router
  ) {
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem('token', this.token);
  }

  get token(): string {
    if (!this._token) {
      this._token = localStorage.getItem('token') + '';
    }
    return this._token;
  }

  set managerId(managerId: string){
    this._managerId = managerId;
    localStorage.setItem('manager_id', this.managerId);
  }

  get managerId(): string {
    if (!this._managerId) {
      this._managerId = localStorage.getItem('manager_id') + '';
    }
    return this._managerId;
  }


  login(loginData: loginDTO): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/${this.postfix}/login`, loginData, {withCredentials: true})
      .pipe(
        map((response: any) => {
          if (response?.authToken) {
            this.token = response.authToken;
            this.managerId = response.workerId;
          }

          // this._workSessionService.beginSession()
          //   .subscribe(res => {
          //     console.log('Begin Session: ', res);
          //     return response;
          //   });
        })
      );
  }

  killToken(): void {
    this.token = '';
  }

  logout(): void {
    this._httpClient.get(`${environment.apiUrl}/${this.postfix}/logout`)
      .subscribe(() => {
        this.killToken();
        this.router.navigate(['/auth']);
      });
  }

  isLoggedIn(): boolean {
    return !!this.token || localStorage.getItem('token') === null;
  }

  loadRolesAndCheck(role: string): Promise<boolean> {
    return this._httpClient.get<boolean>(`${environment.apiUrl}/${this.postfix}/getroles`)
      .pipe(
        map((response: any) => {
          this.userRoles = response.roles;
          return !!this.userRoles.filter(r => r.titleEn === role).length;
        })
      ).toPromise();
  }

  loadRoles(): void {
    this._httpClient.get<any>(`${environment.apiUrl}/${this.postfix}/getroles`)
      .pipe(
        map(response => response.roles)
      )
      .subscribe((roles: Role[]) => {
        this.userRoles = roles;
      });
  }
}
