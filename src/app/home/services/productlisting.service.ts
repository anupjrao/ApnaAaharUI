import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListingData } from '../../Models/ProductListingData'
import {baseURL} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductlistingService {
  private apiURL;
  constructor(private http: HttpClient) { 
    this.apiURL = baseURL;
  }

  getProductListings() : Observable<ProductListingData[]>{
    return this.http.get<ProductListingData[]>(`${this.apiURL}/ProductListings/GetListings`);
  }
}
