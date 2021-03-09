import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private loginEvent = new Subject<boolean>();
  _loginEvent = this.loginEvent.asObservable();

  constructor(private route:Router) { }
  userLogin(loggedIn: boolean) {
    this.loginEvent.next(loggedIn);
    this.route.navigate(['/home']);
  }


}
