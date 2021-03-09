import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/Models/ProductType';
import { baseURL } from '../../../environments/environment'
import {User} from '../../Models/User'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiURL;
private requestEvent = new Subject<boolean>();
_requestEvent = this.requestEvent.asObservable();

  constructor(private http:HttpClient,private route:Router) {
    this.apiURL=baseURL;
   }
   request(accepted:boolean)
  {
    this.requestEvent.next(accepted);
  }

  getProductTypes():Observable<ProductType[]>{
    return this.http.get<ProductType[]>(`${this.apiURL}/Admin/GetProductTypes`);
  }

  updateMsp(productType:ProductType):Observable<boolean>{
    return this.http.post<boolean>(`${this.apiURL}/Admin/UpdateMsp`,productType);
  }

  getRegisteredFarmers():Observable<User[]>{
    return this.http.get<User[]>(this.apiURL+'/Admin/GetRegisteredFarmers');
  }
  
  getRequestingFarmers():Observable<User[]>{
    return this.http.get<User[]>(this.apiURL+'/Admin/GetRequestingFarmers');
  }

  acceptRequest(user:User):Observable<boolean>{
    return this.http.post<boolean>(this.apiURL+'/Admin/AcceptRequest',user);
  }
  declineRequest(user:User):Observable<boolean>{
    return this.http.post<boolean>(this.apiURL+'/Admin/declineRequest',user);
  }
  disableUser(user:User):Observable<boolean>{
    return this.http.post<boolean>(this.apiURL+'/Admin/DisableUser',user);
  }
  
}
