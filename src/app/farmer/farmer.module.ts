import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FarmerRoutingModule } from './farmer-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { DealsComponent } from './components/deals/deals.component';
import { ChooseProductComponent } from './components/choose-product/choose-product.component';
import { UpdateproductsComponent } from './components/updateproducts/updateproducts.component';
import {MaterialModule} from '../material.module';
import { FarmerProdcutServiceService } from './Services/farmer-prodcut-service.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from '../shared/authorization.interceptor';

@NgModule({
  declarations: [DashboardComponent, UpdateprofileComponent, AddproductsComponent, DealsComponent, ChooseProductComponent, UpdateproductsComponent],
  imports: [
    CommonModule,
    FarmerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [FarmerProdcutServiceService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}
  ],
})
export class FarmerModule {
  
 }
