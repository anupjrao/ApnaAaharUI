import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Models/User';
import { FarmerDetails } from '../../Models/FarmerDetails';
import { baseURL } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  private apiURL;
  constructor(private http: HttpClient) {
    this.apiURL = baseURL;
  }

  addUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiURL}/User/AddUser`, user);
  }
  addFarmer(farmer: FarmerDetails): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/Farmer/AddFarmer`, farmer);
  }
}
