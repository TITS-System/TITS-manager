import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSharedModule } from './shared/modules/material-shared.module';
import { LoginInputComponent } from './shared/components/login-input/login-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from './shared/components/password-input/password-input.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SharedModule } from './shared/modules/shared.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginInputComponent,
    PasswordInputComponent,
    CheckboxComponent,
    SelectRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
