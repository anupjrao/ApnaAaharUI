import { Component, OnInit,OnChanges } from '@angular/core';
import{User} from '../../../Models/User';
import {AdminService} from '../../services/admin.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css']
})
export class RegisteredComponent implements OnInit,OnChanges {
public users:User[];
user:User;
  constructor(private adminService:AdminService) { 
    this.adminService._requestEvent.subscribe(data=>
      {
        if(data)
        {
          this.ngOnChanges();
        }
      })
  }

  ngOnInit(): void {
    this.adminService.getRegisteredFarmers().subscribe(data=>{this.users=data},error=>console.log("error Occured"));
  }
  ngOnChanges():void{
    this.ngOnInit()
  }
  disable(userId:number)
  {
    this.user=new User();
    this.user.userId=userId;
    this.adminService.disableUser(this.user).subscribe(
      data=>{
        if(data)
        {
          Swal.fire('Disabled','Successfully','success');
        }
        else{
          Swal.fire('Disabled','Unable to disable user. Please try again','info')
        }
        this.ngOnChanges();},
        error=>{Swal.fire('error','Something went wrong','error')}
    );
  }
}
