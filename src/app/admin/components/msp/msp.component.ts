import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ProductType } from '../../../Models/ProductType';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-msp',
  templateUrl: './msp.component.html',
  styleUrls: ['./msp.component.css']
})
export class MspComponent implements OnInit, OnChanges {

  productTypes: ProductType[] = new Array<ProductType>();
  editField: number;
  productTypeId: number;
  updateEvent: boolean = false;
  constructor(private adminService: AdminService) {

  }
  ngOnChanges(): void {
    this.ngOnInit();
  }

  ngOnInit() {
    this.adminService.getProductTypes().subscribe(data => { this.productTypes = data });
  }

  change(event: any, id) {
    this.editField = event.target.textContent;
    this.productTypeId = id;
    this.updateEvent = false;
  }

  update(productId: number) {
    if (this.productTypeId != productId && this.productTypeId != undefined) {
      Swal.fire('Oops', 'Update properly with respective msp', 'error');
      this.productTypeId = undefined;
      this.editField = undefined;
      this.ngOnInit();
      return false;
    }
    this.updateEvent = false;
    let mspValue = Number(this.editField);
    if (this.editField == undefined) {
      Swal.fire('Oops', 'Updated value is same as existing value', 'error');
      this.productTypeId = undefined;
      return false;
    }
    if (isNaN(mspValue) || mspValue <= 0) {
      this.updateEvent = false;
      Swal.fire('Oops! cannot update', 'Price should contain only digits greater than 0', 'error');
      this.productTypeId = undefined;
      return false;
    }
    else {
      let productData = new ProductType();
      productData.productTypeId = productId;
      productData.msp = mspValue;
      this.adminService.updateMsp(productData).subscribe(data => {
        if (data) {
          Swal.fire('Updated', 'Msp Updated Successfully', 'success');
          this.editField = undefined;
          this.updateEvent = true;
          this.productTypeId = undefined;
          this.ngOnChanges();
        }
        else {
          Swal.fire('Oops', 'Updated value is same as existing value', 'error');
          this.editField = undefined;
          this.updateEvent = false;
          this.productTypeId = undefined;
        }
      }, error => { Swal.fire('Oops', 'Failed to Update Msp', 'error'); this.editField = undefined; this.productTypeId = undefined; this.updateEvent = false }
      );
    }
  }
}
