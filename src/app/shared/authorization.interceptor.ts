import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let apiToken = JSON.parse(sessionStorage.getItem('apiToken'));
    let authToken = JSON.parse(sessionStorage.getItem('authToken'));
    let token=null;
    if(authToken!=null && authToken!=undefined)
    {
      token = authToken.authToken;
    }
    else if(apiToken!=null && apiToken!=undefined){
      token = apiToken.token;
    }
    if(token!=null)
    {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    }
    else{
      return next.handle(request);
    }
    
  }
}
