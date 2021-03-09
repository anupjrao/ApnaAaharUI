import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormGroup, FormBuilder,Validators, FormControl, NgModel } from '@angular/forms';
import {BuyerService} from '../../services/buyer.service';
import{Router} from '@angular/router';
import { User } from '../../../Models/User';
import {PasswordModel} from '../../../Models/PasswordData'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  ngOnInit(): void {
    
    
  }
  hide1=true;
  hide2=true;
  UpdateForm:FormGroup;
  LocationUpdated:boolean=false;
  passwordUpdated:boolean=false;
  similarPwd:boolean=false;
  
  currentPwd:string='';
  newPwd:string='';
  dataCarrier:PasswordModel;
   token:User;
  constructor(private fb:FormBuilder,private buyerservice:BuyerService,private route :Router) {
    this.token=JSON.parse(sessionStorage.getItem('authToken'));
     this.UpdateForm  =new FormGroup({
      Location:new FormControl(this.token.location),
      CurrentPassword: new FormControl(''),
      NewPassword:new FormControl('',[Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)])
    });
   }
  
  isValidLocation():boolean
  {
    if(this.UpdateForm.value.Location!='' && this.UpdateForm.value.Location!=this.token.location)
    {
      return true;
    }
  }
 

  OnSubmit()
  {
    this.LocationUpdated=false;
    this.passwordUpdated=false;
    this.similarPwd=false;
    this.token=JSON.parse(sessionStorage.getItem('authToken'));
    if(this.token!=null)
    {
      this.dataCarrier=new PasswordModel();
      this.dataCarrier.userId=this.token.userId;
        if(this.isValidLocation() )
        {
          this.dataCarrier.location=this.UpdateForm.value.Location;
          this.buyerservice.UpdateUserLocation(this.dataCarrier).subscribe(data=>{this.LocationUpdated=data>0?true:false;
            if(this.LocationUpdated)
            {
              Swal.fire('Location','Updated Succesfully','success');
              this.token.location=this.dataCarrier.location;
              this.UpdateForm.reset();
              this.UpdateForm.controls.Location.setValue(this.token.location);
              sessionStorage.setItem('authToken',null);
              sessionStorage.setItem('authToken',JSON.stringify(this.token));
            }},error=>{Swal.fire('error','SomeThing went wrong','error')});
          
        }
      this.currentPwd=this.UpdateForm.value.CurrentPassword;
      this.newPwd=this.UpdateForm.value.NewPassword;
      if(this.currentPwd!='' && this.newPwd!='' &&this.UpdateForm.get('NewPassword').valid)
        {
          if(this.currentPwd === this.newPwd)
            {
              this.similarPwd=true;
            }  
          else
          {
            this.dataCarrier.currentPassword=this.currentPwd;
            this.dataCarrier.newPassword=this.newPwd;
            this.buyerservice.UpdateUserPassword(this.dataCarrier).subscribe(data=>{
              if(data)
              {
                Swal.fire('Update','Updated Succesfully','success');
              }
              else
              {
                Swal.fire('Update','Current password entered is incorrect.','error')
              }
              this.UpdateForm.reset();
              this.UpdateForm.controls.Location.setValue(this.token.location);

            },error=>console.log("error is :"+error.error));
          }
        } 

    }
    else
    {
      Swal.fire('Session Expired!','Please Log in Again..','error');
      this.route.navigateByUrl('/login');
    }
  }
}
