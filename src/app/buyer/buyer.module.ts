import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { BuyerRoutingModule } from './buyer-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductlistingsComponent } from './components/productlistings/productlistings.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import {MaterialModule} from '../material.module';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthorizationInterceptor } from '../shared/authorization.interceptor';
import { ContactRequestButtonDirective } from './contact-request-button.directive';
@NgModule({
  declarations: [DashboardComponent, ProductlistingsComponent, UpdateprofileComponent, ContactRequestButtonDirective],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    ReactiveFormsModule,FormsModule,
    MaterialModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}],
})
export class BuyerModule { 
  
  

}
