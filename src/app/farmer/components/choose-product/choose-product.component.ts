import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{FarmerProdcutServiceService} from '../../Services/farmer-prodcut-service.service'
import {User} from '../../../Models/User';
import {ProductListingData} from '../../../Models/ProductListingData';

import { images } from '../../../shared/images';

@Component({
  selector: 'app-choose-product',
  templateUrl: './choose-product.component.html',
  styleUrls: ['./choose-product.component.css']
})
export class ChooseProductComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _Services:FarmerProdcutServiceService) { 
    
    this.images = images;
  }
  images;
  produtTypes=[]
  ProductListingsOfFarmer=[]
  token;
  traceValue;
  prooductData= new ProductListingData();
  _hasAPIReturnedValue:boolean;
  ngOnInit(): void {
    this._hasAPIReturnedValue = false;
    this._Services.getProductType().subscribe((data)=>{this.produtTypes=data});
    this.token=JSON.parse(sessionStorage.getItem('authToken'));
    let user=new User();
    user.userId=this.token.userId;
    this.traceValue=sessionStorage.getItem("TracedValue");
    this._Services.getProductListingsForFarmer(user).subscribe((data)=>{this.ProductListingsOfFarmer=data; this._hasAPIReturnedValue = true;});
  }
  filterProductTypes(){
    this.ProductListingsOfFarmer.sort((a, b) => (a.productTypeId>b.productTypeId) ? 1 : -1);
    this.produtTypes =  this.produtTypes.filter((obj)=> { return this.ProductListingsOfFarmer.find(x=>x.productTypeId==obj.productTypeId)==null; });
  }
  GetValue(item){
    this._Services.productType=item;
    this.prooductData= this.ProductListingsOfFarmer.find(x=>x.productTypeId==item.productTypeId);
    if(this.prooductData==null){
      sessionStorage.setItem("productType",JSON.stringify(item));
      this.router.navigate(['/farmer/AddProduct']);
    }
    else{
      sessionStorage.setItem("productData",JSON.stringify(this.prooductData));
      this.router.navigate(['/farmer/UpdateProduct']);
    }
  }
}
