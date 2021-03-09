import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { DealsComponent } from './components/deals/deals.component';
import { ChooseProductComponent } from './components/choose-product/choose-product.component';
import { UpdateproductsComponent } from './components/updateproducts/updateproducts.component';
import{FarmerGuardGuard} from './Guards/farmer-guard.guard';
import {FarmerAddProductGuard} from './Guards/farmer-add-product.guard';
import{FarmerUpdateProductGuard} from './Guards/farmer-update-product.guard';
import{FarmerDealsGuard} from './Guards/farmer-deals.guard';
import { from } from 'rxjs';
const routes: Routes = [
  {path:'chooseProduct', component:ChooseProductComponent, canActivate:[FarmerGuardGuard]},
  {path:'AddProduct', component:AddproductsComponent, canActivate:[FarmerAddProductGuard] },
  {path:'Dashboard', component:DashboardComponent, canActivate:[FarmerGuardGuard]},
  {path:'UpdateProduct', component:UpdateproductsComponent,canActivate:[FarmerUpdateProductGuard]},
  {path:'Deals',component:DealsComponent,canActivate:[FarmerDealsGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FarmerRoutingModule { }
