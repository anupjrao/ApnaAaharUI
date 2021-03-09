import { OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import{User} from '../../../Models/User';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit,OnChanges {
  public users:User[]=new Array();
    constructor(private adminService:AdminService) { 
      
    }
    user:User;
  ngOnInit(): void {
    this.adminService.getRequestingFarmers().subscribe(data=>{this.users=data},error=>console.log("error Occured"));

  }
  ngOnChanges():void{
    this.ngOnInit();
  }
  accept(userId:number)
  {
    this.user=new User();
    this.user.userId=userId;
    this.adminService.acceptRequest(this.user).subscribe(data=>{
      if(data)
      {
        Swal.fire('Request','Accepted','success');
        this.adminService.request(data);
        this.ngOnChanges();
      }
      else{
        Swal.fire('Request','Unable to process request. Please try again','info')
      }
      },
      error=>{Swal.fire('error','Something went wrong','error')});
  }

  decline(userId:number)
  {
    this.user=new User();
    this.user.userId=userId;
    this.adminService.declineRequest(this.user).subscribe(data=>{
     
      if(data)
      {
        Swal.fire('Request','declined Successfully','success');
      }
      else{
        Swal.fire('Request','Unable to decline request. Please try again','info')
      }
      this.ngOnChanges();
      },error=>{Swal.fire('error','Something went wrong','error')});
    
  }
}
