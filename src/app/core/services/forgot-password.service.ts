import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../../Models/User';
import {baseURL} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiURL;
  constructor(private _HttpService:HttpClient) {
    this.apiURL = baseURL;
   }
  user=new User();
  public GetOtp(user:User):Observable<number>{
    return this._HttpService.post<number>(`${this.apiURL}/Account/SendOtp`,user);
  }
  public ResetPassword(user:User){
    return this._HttpService.post(`${this.apiURL}/Account/ResetPassword`,user);
  }
}
