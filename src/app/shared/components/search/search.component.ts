import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  
  search:FormGroup;
  constructor(private formBuilder:FormBuilder,private router: Router) {
    this.search=this.formBuilder.group(
      {
        productType:new FormControl('')

      }
    );
   }

  ngOnInit(): void {
  }
  product:string="";
  SearchProducts()
  {

    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        product:this.search.controls.productType.value
      }
  };
  this.router.navigate(["/buyer/listings"], navigationExtras);
  }


}
