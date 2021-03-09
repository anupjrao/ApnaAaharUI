import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { FarmerProdcutServiceService } from '../../Services/farmer-prodcut-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductListingData } from '../../../Models/ProductListingData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateproducts',
  templateUrl: './updateproducts.component.html',
  styleUrls: ['./updateproducts.component.css']
})
export class UpdateproductsComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private _Services: FarmerProdcutServiceService,private router: Router, private route: ActivatedRoute) {
    this.productData = JSON.parse(sessionStorage.getItem("productData"));
    this.msp = this.productData.productType.msp;

    this.updateProductForm = this.fb.group({
      productQuantity: [this.productData.quantity, [Validators.required, Validators.min(1), Validators.max(100)]],
      price: [this.productData.price, [Validators.required, Validators.min(this.msp)]],
    })
  }

  updateProductForm: FormGroup;
  productData: ProductListingData
  newProductListing = new ProductListingData();
  msp: number = 0;
  defaultQuantity;
  defaultPrice;

  ngOnInit(): void {
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(){
    sessionStorage.removeItem("productData");
  }

  updateListingsOnSubmit(){
    this.newProductListing = this.productData;
    this.newProductListing.quantity = this.updateProductForm.get('productQuantity').value;
    this.defaultQuantity = this.updateProductForm.get('productQuantity').value;
    this.newProductListing.price = this.updateProductForm.get('price').value;
    this.defaultPrice = this.updateProductForm.get('price').value;

    this._Services.updateProductListings(this.newProductListing)
    .subscribe(data=>{
      if(data>0){
        Swal.fire({
          title:'Product Listing',
          text:'Updated succesfully',
          icon:'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.removeItem("productData");
            this.router.navigate(['/farmer/Dashboard'], { relativeTo: this.route })
          }
        })
        
        sessionStorage.setItem("productData",JSON.stringify(this.productData));
      }
    },
    error=>{
      Swal.fire('Update','Failed','error')
    }
    );

  }
  

}
