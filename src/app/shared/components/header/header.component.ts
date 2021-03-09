import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { HeaderService } from '../../services/header.service';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  constructor(private route: Router, private headerService: HeaderService, private authService: AuthorizationService) { 
    headerService._loginEvent.subscribe(data => {
      if(data)
        this.ngOnChanges();
  });
  }
  
  user: User;
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('authToken'));
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  logOut():boolean {
    sessionStorage.removeItem('authToken');
    this.authService.authorizeVisitor().subscribe(data => { sessionStorage.setItem('apiToken', JSON.stringify(data));});
    this.ngOnChanges();
    this.route.navigate(['home']);
    return true;
  }
  routeToHome():boolean {
    this.route.navigate(['home']);
    return true;
  }
  routeToLogin():boolean
  {
    this.route.navigate(['/user/login']);
    return true;
  }
  routeToRegister():boolean
  {
    this.route.navigate(['/user/register']);
    return true;
  }
  updateProfile():boolean{
    this.route.navigate(['/buyer/updatePassword']);
    return true;
  }
  redirect():number{
    if(this.user.userRole==0)
    {
      this.route.navigate(['/admin/dashboard']);
      return 1;
    }
    if(this.user.userRole==1)
    {
      this.route.navigate(['/farmer/Dashboard']);
      return 2;
    }
    if(this.user.userRole==2)
    {
      this.route.navigate(['/buyer/listings']);
      return 3;
    }
  }
}
