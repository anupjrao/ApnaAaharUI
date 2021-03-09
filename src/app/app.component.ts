import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from './Models/User';
import { HeaderService } from './shared/services/header.service'
import { visitorApiKey } from './../environments/environment';
import { AuthorizationService } from './authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
  title = 'ApnaAahar';
  userActivity;
  userInactive: Subject<any> = new Subject();
  constructor(private headerService: HeaderService, private authService: AuthorizationService) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      if (sessionStorage.getItem('authToken'))
        Swal.fire({
          title: 'Hey,Are you there?',
          text: 'You will be logged out! Do you want to continue?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes,Continue!',
          cancelButtonText: 'No,I want to Leave!',
        }).then((result) => {

          if (result.isConfirmed) {
            clearTimeout(this.userActivity);
          }
          else if (result.isDismissed) {
            sessionStorage.removeItem('authToken');
            this.headerService.userLogin(true);
          }
        })

    });
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  token;
  ngOnInit() {
    this.token = sessionStorage.getItem('apiToken');
    if (sessionStorage.getItem('apiToken') == null) {
      this.authService.authorizeVisitor().subscribe(data => { sessionStorage.setItem('apiToken', JSON.stringify(data)); this.token = sessionStorage.getItem('apiToken')});
    }
  }
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
