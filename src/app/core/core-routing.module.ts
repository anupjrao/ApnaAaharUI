import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ReserPasswordComponent } from './components/reser-password/reser-password.component';
import { UserLoginService } from './services/user-login.service';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import {ResetPasswordGuardServiceGuard} from './Guards/reset-password-guard-service.guard';
import {ForgotPasswordGuard} from './Guards/forgot-password.guard';
const routes: Routes = [
  {path: 'user/forgotPassword' , component:ForgotpasswordComponent, canActivate: [ForgotPasswordGuard] },
  {path: 'resetPassword' , component:ReserPasswordComponent, canActivate:[ResetPasswordGuardServiceGuard] },
  {path:'register',component:UserregisterComponent},
  {path:'login',component: UserloginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
