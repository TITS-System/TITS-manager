import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AccountService} from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  authFormGroup: FormGroup = new FormGroup({});
  validators = [Validators.required];
  isFormSent = false;


  constructor(
    private router: Router,
    readonly matSnackBar: MatSnackBar,
    private accountService: AccountService
  ) {
  }


  ngOnInit(): void {
    this.authFormGroup = new FormGroup({
      login: new FormControl('', this.validators),
      password: new FormControl('', this.validators)
    });
  }


  auth(): void {
    if (this.authFormGroup.invalid) {
      return;
    }


    const values = {...this.authFormGroup.value};
    this.isFormSent = true;

    this.accountService.login(values)
      .subscribe(() => {
        this.isFormSent = false;

        this.router.navigate(['/manager']);

      }, error => {
        this.isFormSent = false;
        if (error.error?.error) {
          this.matSnackBar.open(error.error?.error, '', {duration: 3000});
        } else {
          this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000});
          console.log('Error:', error);
        }
      });
  }

}
