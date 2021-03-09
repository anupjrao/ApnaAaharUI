import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'}, //home routes to carousel component
  {path:'buyer', loadChildren: () => import('./buyer/buyer.module').then(m=>m.BuyerModule)},
  {path:'user', loadChildren: () => import('./core/core.module').then(m=>m.CoreModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)},
  {path: 'farmer', loadChildren: () => import('./farmer/farmer.module').then(m=>m.FarmerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
