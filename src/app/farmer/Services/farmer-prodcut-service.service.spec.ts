import { TestBed } from '@angular/core/testing';
import{HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { FarmerProdcutServiceService } from './farmer-prodcut-service.service';
import { baseURL } from '../../../environments/environment';
import { ProductType } from 'src/app/Models/ProductType';
import { ProductListingData } from 'src/app/Models/ProductListingData';
import { User } from 'src/app/Models/User';

describe('FarmerProdcutServiceService', () => {
  let service: FarmerProdcutServiceService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[FarmerProdcutServiceService]
    });
    service = TestBed.inject(FarmerProdcutServiceService);
    httpMock=TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should Return ProductTypeList',()=>{
    let productType=new ProductType();
    productType.msp=40;
    productType.productTypeId=1;
    productType.productType1="Rice";

    let productType1=new ProductType();
    productType.msp=40;
    productType.productTypeId=2;
    productType.productType1="Wheat";

   let productTypeList=[];
   productTypeList.push(productType1);
   productTypeList.push(productType);
   service.getProductType().subscribe((data)=>{
     expect(data).toEqual(productTypeList);
   });
   const url=baseURL;
   const request=httpMock.expectOne(`${url}/ProductListings/GetAllProductTypes`);
   expect(request.request.method).toBe('GET');
   request.flush(productTypeList)

  });

  it('Should Return Product Listings',()=>{
    let productlisting1=new ProductListingData();
    productlisting1.productListingId=1;
    productlisting1.productTypeId=2;
    productlisting1.price=50;
    productlisting1.quantity=50;

    let productlisting2=new ProductListingData();
    productlisting2.productListingId=2;
    productlisting2.productTypeId=1;
    productlisting2.price=50;
    productlisting2.quantity=50;

    let user = new User();
    user.userId=1;
    user.userFullName="UserTest";  
   let productListingsArray=[];
   productListingsArray.push(productlisting1);
   productListingsArray.push(productlisting2);
   service.getProductListingsForFarmer(user).subscribe((data)=>{
     expect(data).toEqual(productListingsArray);
   });
   const url=baseURL;
   const request=httpMock.expectOne(`${url}/ProductListings/GetListingsByFarmer`);
   expect(request.request.method).toBe('POST');
   request.flush(productListingsArray)

  });


  it('It Should Add A product',()=>{
    let productData=new ProductListingData();
    productData.price=60;
    productData.quantity=33;
    productData.productTypeId=1;
    productData.farmerId=1;
    service.AddProduct(productData).subscribe(res=>{
      expect(res).toBeTruthy();
    });
    const url=baseURL;
    const request=httpMock.expectOne(`${url}/ProductListings/AddProductListings`);
    expect(request.request.method).toBe('POST');
  });

  it('It should update Product Listing',()=>{
    let productData=new ProductListingData();
    productData.price=60;
    productData.quantity=33;
    productData.productTypeId=1;
    productData.farmerId=1;
    service.updateProductListings(productData).subscribe(res=>{
      expect(res).toEqual(1);
    });
    const url=baseURL;
    const request=httpMock.expectOne(`${url}/ProductListings/UpdateProductListings`);
    expect(request.request.method).toBe('PUT');
    request.flush(1);

  })
});


