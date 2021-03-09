import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import{ CountdownModule} from 'ngx-countdown'
import { CoreRoutingModule } from './core-routing.module';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ReserPasswordComponent } from './components/reser-password/reser-password.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import {MaterialModule} from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import {UserregisterService} from './services/userregister.service';
import {UserLoginService} from './services/user-login.service';

@NgModule({
  declarations: [UserloginComponent, UserregisterComponent, ForgotpasswordComponent,ReserPasswordComponent],
  imports: [
    CommonModule,
    CountdownModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports:[UserregisterComponent,UserloginComponent],
  providers:[UserregisterService,UserLoginService]
})
export class CoreModule { }
