import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import {User} from 'src/app/Models/User'
import {UserLoginService} from '../../services/user-login.service';
import { Location } from '@angular/common';
import {HeaderService} from '../../../shared/services/header.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})


export class UserloginComponent implements OnInit  {
  loginForm: FormGroup;
  constructor(private loginService:UserLoginService,private _location: Location, private headerService: HeaderService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    
  }

  passwordError:string="Please enter your password!";
  invalidEmailError:string="Enter a valid email Id!";
  emailFieldEmptyError:string="	Please enter email Id! ";
  hide = true;
  user = new User();
  token= new User();
  errorUser:string="";
  onSubmit()
  {
    this.user.email= this.loginForm.get('email').value
    this.user.password=this.loginForm.get('password').value;
    
     this.loginService.authenticate(this.user).subscribe((data)=>{
       if(data!=null && data.userRole!=1)
       {
         sessionStorage.setItem('authToken',JSON.stringify(data));
         this.headerService.userLogin(true);
       }
       else if(data.farmerDetails[0].isApproved==true){
        sessionStorage.setItem('authToken',JSON.stringify(data));
        this.headerService.userLogin(true);
       }
       else{
        {Swal.fire('Login Failed!','Your Account is not still approved','error')}
       }
     },
     error=>{Swal.fire('Login Failed!','Please enter a valid email and password!','error')}
     );
  }
  
  Back(){
    this._location.back();
  }

  Eventrigger(){
    sessionStorage.setItem('isLinkClicked','1')
  }
}

