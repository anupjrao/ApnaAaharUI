import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RegisteredComponent } from './components/registered/registered.component';
import { MspComponent } from './components/msp/msp.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AdminService} from './services/admin.service';
import {MaterialModule} from '../material.module';
import { AuthorizationInterceptor } from '../shared/authorization.interceptor';

@NgModule({
  declarations: [DashboardComponent, RequestsComponent, RegisteredComponent, MspComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers:[AdminService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}
  ]
})
export class AdminModule { }
