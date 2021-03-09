import { Component, HostListener, OnInit } from '@angular/core';
import { ListingDataService } from '../../services/listing-data.service';
import { ProductListingData } from '../../../Models/ProductListingData';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { images } from '../../../shared/images';
import { User } from 'src/app/Models/User';
import { BuyerContactRequest } from 'src/app/Models/BuyerContactRequest';
import Swal from 'sweetalert2'
import { error } from '@angular/compiler/src/util';
import { ContactRequest } from 'src/app/Models/ContactRequest';
@Component({
  selector: 'app-productlistings',
  templateUrl: './productlistings.component.html',
  styleUrls: ['./productlistings.component.css'],
})
export class ProductlistingsComponent implements OnInit {
  contactRequests: ContactRequest[] = [];
  constructor(private listingService: ListingDataService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this._images = images;
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.queryString = params['product'] });
    this._hasAPIReturnedValue = false;
    this.checkBuyer();
    this.getBuyerRequests();
  }
  _hasAPIReturnedValue: boolean;
  _images;
  User: User;
  isBuyer;
  checkBuyer() {
    this.User = JSON.parse(sessionStorage.getItem('authToken'));
    if (this.User == null)
      this.isBuyer = false;
    else {
      if (this.User.userRole == 2)
        this.isBuyer = true;
      else
        this.isBuyer = false;
    }
    return this.isBuyer;
  }
  queryString: string;
  filterTypeByUrl() {
    if (this.queryString != undefined) {
      this.filterFormGroup.controls.filter.setValue(this.queryString);
      this.getFilteredList();
    }
    else
      this.getAllListings();
  }

  filterFormGroup = this.formBuilder.group({
    filter: ['']
  });
  filterByPriceAndLocation = this.formBuilder.group({
    priceFilter: [''],
    locationFilter: [''],
  });

  listingData: ProductListingData[];
  listingDataComplete: ProductListingData[];
  getAllListings() {
    this._hasAPIReturnedValue = false;
    this.filterByPriceAndLocation.controls.locationFilter.setValue('');
    this.listingService.getProductListings().subscribe(
      data => {
        this.listingData = data; this.listingDataComplete = data;
        this._hasAPIReturnedValue = true;
      })
  }
  getFilteredList() {
    this._hasAPIReturnedValue = false;
    if (this.filterFormGroup.controls.filter.value == '' || this.filterFormGroup.controls.filter.value == null) {
      this.listingService.getProductListings().subscribe(data => { this.listingDataComplete = data; this.listingData = data; this._hasAPIReturnedValue = true; });
    }
    else {
      this.listingService.getProductListingsFiltered(this.filterFormGroup.controls.filter.value).subscribe(data => { this.listingData = data; this.listingDataComplete = data; this._hasAPIReturnedValue = true; })
    }
  }
  filterByPriceAndLoc() {
    let priceFilter: number = this.filterByPriceAndLocation.controls.priceFilter.value;
    let locationFilter: string = this.filterByPriceAndLocation.controls.locationFilter.value;
    var locationFilterPattern = new RegExp(locationFilter, 'i');
    this.listingData = this.listingDataComplete.filter((listings) => { return listings.price <= priceFilter && locationFilterPattern.test(listings.farmer.user.location); });
  }
  clearFilters() {
    this.filterByPriceAndLocation.reset();
    this.filterFormGroup.reset();
    this.getAllListings();
  }
  createRequest(data?) {
    if (this.User == null || this.User == undefined) {
      Swal.fire({
        title: 'Login to contact',
        text: 'Would you like to log-in to contact the farmer?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, login',
        cancelButtonText: 'No, take me back to listings',
      }).then((result) => {

        if (result.isConfirmed) {
          this.router.navigate(['/user/login']);
        }
      })
    }
    else {
      let contactRequest: BuyerContactRequest = new BuyerContactRequest();
      contactRequest.productListing = data;
      contactRequest.user = this.User;
      this.listingService.requestFarmerContact(contactRequest).subscribe(data => {
        if (data == true) {
          Swal.fire({
            title: 'Contact request sent successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          let addedContactRequest = new ContactRequest();
          addedContactRequest.ProductListingId = contactRequest.productListing.productListingId;
          this.ngOnInit();
        }
        if (data == false) {
          Swal.fire({
            title: 'Oops',
            text: 'Failed to add contact request',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      });
    }
  }
  getBuyerRequests(): boolean {
    if (this.User == null || this.User == undefined || this.User.userRole != 2)
      return false;
    else {
      this.listingService.getBuyerContactRequests(this.User.userId).subscribe(
        data => {
          this.contactRequests = data;
          this.filterTypeByUrl();
        },
        error => {
          console.log(error);
        });
      return true;
    }
  }
  getValueListing(listing: ProductListingData) {
    let listingValue = false;
    for (let i = 0; i < this.contactRequests.length; i++) {
      if (listing.productListingId == this.contactRequests[i]['productListingId'])
        listingValue = true;
    }
    return listingValue;
  }
}