import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../admin/components/dashboard/dashboard.component';
import {AdminGuard} from './Guards/admin.guard';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
