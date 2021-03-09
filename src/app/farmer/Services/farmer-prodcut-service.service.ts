import { Injectable } from '@angular/core';
import { baseURL } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../Models/User';
import { ProductType } from '../../Models/ProductType';
import {ProductListingData} from '../../Models/ProductListingData';

@Injectable({
  providedIn: 'root'
})
export class FarmerProdcutServiceService {
  private apiURL;
  public productType: ProductType;
  constructor(private _HttpService: HttpClient) {
    this.apiURL = baseURL;
  }

  public getProductType(): Observable<any> {
    return this._HttpService.get<any>(`${this.apiURL}/ProductListings/GetAllProductTypes`);
  }

  public getProductListingsForFarmer(user: User): Observable<any> {
    return this._HttpService.post<any>(`${this.apiURL}/ProductListings/GetListingsByFarmer`, user);
  }

  public updateProductListings(productListingNew:ProductListingData):Observable<number>{
    return this._HttpService.put<number>(`${this.apiURL}/ProductListings/UpdateProductListings`, productListingNew);
  }

  public AddProduct(productData:ProductListingData):Observable<boolean>{
    return this._HttpService.post<boolean>(`${this.apiURL}/ProductListings/AddProductListings`,productData);
  }
}
