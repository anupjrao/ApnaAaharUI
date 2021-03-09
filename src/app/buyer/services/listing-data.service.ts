import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ProductListingData} from '../../Models/ProductListingData'
import {BuyerContactRequest} from '../../Models/BuyerContactRequest'

import { Observable, of, Subject } from 'rxjs';
import {baseURL, visitorApiKey} from '../../../environments/environment'
import { ContactRequest } from 'src/app/Models/ContactRequest';
@Injectable({
  providedIn: 'root'
})
export class ListingDataService {

  private apiURL;
  constructor(private http: HttpClient) {
    this.apiURL = baseURL;
   }
   bearer = sessionStorage.getItem('apiToken');
  httpSettings = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  getProductListings(): Observable<ProductListingData[]>{
    return this.http.get<ProductListingData[]>(`${this.apiURL}/ProductListings/GetListings`);
  }
  getProductListingsFiltered(filter:string): Observable<ProductListingData[]>{
    return this.http.get<ProductListingData[]>(`${this.apiURL}/ProductListings/GetListings/${filter}`);
  }
  requestFarmerContact(contactRequest:BuyerContactRequest): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiURL}/BuyerContactRequest/AddContactRequest`, contactRequest);
  }
  getBuyerContactRequests(buyerId:number): Observable<ContactRequest[]>{
    return this.http.get<ContactRequest[]>(`${this.apiURL}/Buyer/GetBuyerContactRequests/${buyerId}`);
  }
}
