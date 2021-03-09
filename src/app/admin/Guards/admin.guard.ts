import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,private route: ActivatedRoute){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem('authToken')===null){
      Swal.fire({
        title: 'Warning',
        text: "Page is restricted to view",
        icon: 'warning',
        confirmButtonColor: '#C41111',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/home');
        }
      })
      return false;
    }
    else{
      let token=JSON.parse(sessionStorage.getItem('authToken'));
      if(token.userRole!=0){
        Swal.fire({
          title: 'Warning',
          text: "Page is restricted to view",
          icon: 'warning',
          confirmButtonColor: '#C41111',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/home');
          }
        })
        return false;
      }
      return true;
    }
  }
  
}
