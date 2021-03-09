import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { ProductListingData } from '../../../Models/ProductListingData';
import { ProductlistingService } from '../../services/productlisting.service';
import Swal from 'sweetalert2';

import { JsonPipe } from '@angular/common';
import {SearchComponent} from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private productListingService : ProductlistingService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('apiToken'))
    this.productListingService.getProductListings().subscribe(data=>{this.productListings=data,this.sortProductTypes()},error=>{Swal.fire('Oops','Something went Wrong','error')})
    
    this.images = [
      { name: 'assets/carousel-images/tomatoes.jpg'},
      { name: 'assets/carousel-images/potatoes.jpg' },
      { name: 'assets/carousel-images/onions.jpg' }
    ]
    
  }

  images : Array<any>=[];

  productListings:ProductListingData[] = [];

  tomatoListing ;
  potatoListing ;
  onionListing ;


  sortProductTypes(){
    this.productListings.forEach(element => {
      if(element.productType.productType1=="Tomato"){
        this.tomatoListing=element;
      }
      if(element.productType.productType1=="Potato"){
        this.potatoListing=element;
      }
      if(element.productType.productType1=="Onion"){
        this.onionListing=element;
      }
    });
  }
  
}
