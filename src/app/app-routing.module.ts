import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { Role } from './shared/enums/role.enum';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  {path: '', component: SelectRoleComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent},

  {path: 'manager', loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)}
  // {path: 'packer', loadChildren: () => import('./modules/packer/packer.module').then(m => m.PackerModule), canActivate: [RoleGuard], data: {role: Role.Packer}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }