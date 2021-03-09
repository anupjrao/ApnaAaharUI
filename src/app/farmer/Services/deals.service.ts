import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { baseURL } from 'src/environments/environment';
import {BuyerResponse} from '../../Models/BuyerResponse';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  
  private apiURL;
  private requestEvent = new Subject<boolean>();
  constructor(private _HttpService:HttpClient) {
    this.apiURL = baseURL;
   }
  
   request(accepted:boolean)
   {
     this.requestEvent.next(accepted);
   }
 
  getBuyersListings(userId: any):Observable<any> {
    return this._HttpService.get<any>(`${this.apiURL}/Farmer/GetBuyers/${userId}`);
  }


  sendFarmersResponse(buyer : BuyerResponse):Observable<boolean>
  {
    return this._HttpService.post<boolean>(`${this.apiURL}/Farmer/SendFarmerResponse`,buyer);

  }
  
}
