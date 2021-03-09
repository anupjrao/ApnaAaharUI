import { Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DealsService } from '../../Services/deals.service';
import { BuyerResponse } from '../../../Models/BuyerResponse'
import Swal from 'sweetalert2';
import { images } from '../../../shared/images';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit,OnDestroy {

  constructor(private dealsService: DealsService, private formBuilder: FormBuilder) { }
  dealsData = [];
  buyersResponse = new BuyerResponse();
  token;
  _hasAPIReturnedValue:boolean;
  ngOnInit(): void {
    this.token = JSON.parse(sessionStorage.getItem("authToken"))
    this._images = images;
    this.getBuyerListing();
    window.onbeforeunload = () => this.ngOnDestroy();
    this._hasAPIReturnedValue = false;
  }
  getBuyerListing(){
    this._hasAPIReturnedValue=false;
    this.dealsService.getBuyersListings(this.token.userId).subscribe(data => { this.dealsData = data; this._hasAPIReturnedValue=true; })
  }
  ngOnDestroy(){
    sessionStorage.removeItem("DealComponentTriggered");
  }
  ngOnChanges(): void {
    this.ngOnInit();
  }
  _images;
  requestAccepted(id: number) {
    this.buyersResponse.isAccepted = true;
    this.buyersResponse.UserId = this.token.userId;
    this.buyersResponse.Email = this.dealsData[id].buyer.email;
    this.buyersResponse.ContactRequestId = this.dealsData[id].contactRequestId;
    this.buyersResponse.phoneNumber = this.dealsData[id].buyer.phoneNumber;

    this.dealsService.sendFarmersResponse(this.buyersResponse).subscribe(data => {
      if (data) {
        Swal.fire('Request', 'Accepted', 'success');
        this.ngOnChanges();
      }
      else {
        Swal.fire('Request', 'Unable to process request. Please try again', 'info')
      }
    },
      error => { Swal.fire('error', 'Something went wrong', 'error') });
  }

  requestDeclined(id: number) {

    this.buyersResponse.isAccepted = false;
    this.buyersResponse.UserId = this.token.userId;
    this.buyersResponse.Email = this.dealsData[id].buyer.email;
    this.buyersResponse.ContactRequestId = this.dealsData[id].contactRequestId;
    this.dealsService.sendFarmersResponse(this.buyersResponse).subscribe(data => {
      if (data) {
        Swal.fire('Request', 'declined Successfully', 'success');
      }
      else {
        Swal.fire('Request', 'Unable to decline request. Please try again', 'info')
      }
      this.ngOnChanges();
    }, error => { Swal.fire('error', 'Something went wrong', 'error') });
  }
}
