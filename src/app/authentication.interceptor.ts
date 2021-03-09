import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem('authToken') != null) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${sessionStorage.getItem('authToken')}`),
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }  }
