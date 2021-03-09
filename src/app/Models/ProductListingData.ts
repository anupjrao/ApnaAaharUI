import {FarmerDetails} from './FarmerDetails'
import {ProductType} from './ProductType'
import {ContactRequest} from './ContactRequest'

export class ProductListingData{
    productListingId: number;
    farmer: FarmerDetails;
    productType: ProductType;
    price:number;
    quantity:number;
    productTypeId:number;
    farmerId:number;
    contactRequest:ContactRequest[]
}