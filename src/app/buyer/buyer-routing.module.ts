import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistingsComponent } from './components/productlistings/productlistings.component';
import { UpdateprofileComponent } from './components/updateprofile/updateprofile.component';
import {UpdateProfileGuard} from './Guards/update-profile.guard';
const routes: Routes = [
  {path:'productList', component: ProductlistingsComponent},
  {path:'updatePassword',component:UpdateprofileComponent, canActivate: [UpdateProfileGuard]},
  {path:'listings', component: ProductlistingsComponent},
  {path:'listings/:query', component: ProductlistingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
