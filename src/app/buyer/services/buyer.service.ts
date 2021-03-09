import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PasswordModel } from '../../Models/PasswordData';
import {baseURL} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private apiURL;
  constructor(private http:HttpClient)
  {
    this.apiURL = baseURL;
  }
  httpSettings = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  UpdateUserLocation(dataSet:PasswordModel): Observable<number> {
     return this.http.post<number>(`${this.apiURL}/Buyer/UpdateUserLocation`,dataSet,this.httpSettings);
  }

  UpdateUserPassword(dataSet:PasswordModel):Observable<boolean>{
    return this.http.post<boolean>(`${this.apiURL}/Buyer/UpdateUserPassword`,dataSet,this.httpSettings);
  }
}
