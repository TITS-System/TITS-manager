import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // console.log(route.data.role);
    //
    // if (this.accountService.isLoggedIn()) {
    //   return this.accountService.loadRolesAndCheck(route.data.role).then(hasRole => {
    //     console.log(this.accountService.userRoles)
    //     if (hasRole) return true;
    //     else {
    //       this.router.navigate(['/'])
    //       return false
    //     }
    //   });
    // } else {
    //   return false
    // }

    return true;

  }


}
