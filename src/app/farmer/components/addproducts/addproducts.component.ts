import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators,ValidatorFn,FormGroup,ValidationErrors,AbstractControl } from '@angular/forms';
import{FarmerProdcutServiceService} from '../../Services/farmer-prodcut-service.service';
import {ProductType} from '../../../Models/ProductType';
import Swal from 'sweetalert2';
import { ProductListingData } from 'src/app/Models/ProductListingData';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit, OnDestroy{
  productType:ProductType;
  msp:number=9;
  productData=new ProductListingData();
  constructor(private fb: FormBuilder,private _Services:FarmerProdcutServiceService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.productType= JSON.parse(sessionStorage.getItem("productType"));
    this.msp=this.productType.msp;
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(){
    sessionStorage.removeItem("productType");
  }
  get ProductQuantity() {
    return this. AddProductForm.get('ProductQuantity');
  }
  get Price() {
    return this. AddProductForm.get('Price');
  }
  AddProductForm = this.fb.group({
    ProductQuantity: ['', [Validators.required,Validators.min(1),Validators.max(100)]],
    Price: ['', [Validators.required,(control: AbstractControl) => Validators.min(this.msp)(control)]],
  },
  );
 
  Submit() {
    let token=JSON.parse(sessionStorage.getItem('authToken'));
    this.productData.price=this.Price.value;
    this.productData.quantity=this.ProductQuantity.value;
    this.productData.productTypeId=this.productType.productTypeId;
    this.productData.farmerId=token.userId;
    this._Services.AddProduct(this.productData).subscribe(
      () => { 
        Swal.fire({
          title: 'Sucess',
          text: "Product Added Sucessfully!",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.removeItem("productType");
            this.router.navigate(['/farmer/Dashboard'], { relativeTo: this.route })
          }
        })
       }
    );
  }

  
}
