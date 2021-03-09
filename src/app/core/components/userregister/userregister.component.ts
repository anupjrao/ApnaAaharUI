import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Models/User';
import { FarmerDetails } from '../../../Models/FarmerDetails';
import { CommunityDetails } from '../../../Models/CommunityDetails';
import { UserregisterService } from '../../services/userregister.service';
import { Md5 } from 'ts-md5/dist/md5';
import { MustMatch } from './passwordvalidator';
import Swal from 'sweetalert2';
import { Router, RouterLink, RoutesRecognized } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  signUpForm: FormGroup;
  userId: number = 0;
  communityId: number;
  confirmPassowrdError: boolean;
  hashedPassword: string;
  hide = true;
  isEmailExists:boolean;
  isErrorOccured:boolean;
  isHidden:boolean;
  selected:number;
  isCommunityError:boolean;
  response: string;

  

  constructor(private builder: FormBuilder, private userservice: UserregisterService, private routes: Router,private _location:Location) {
    let fullNamePattern: RegExp = /^[^\s][A-Za-z ]{2,30}$/;
    let emailPattern: RegExp = /^(?!.{26})[a-zA-Z]+[a-zA-Z0-9!&*.#$_]+@[a-z0-9.-]+.com$/;
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_.%*?&-])[A-Za-z\d@$!_%*.?&-]{8,}$/;
    this.signUpForm = this.builder.group({
      fullName: new FormControl('', [Validators.required, Validators.pattern(fullNamePattern)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0]?[6789]\d{9}$/)]),
      emailId: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
      userRole: new FormControl('', [Validators.required]),
      signUpType: new FormControl(''),
      farmerId: new FormControl(''),
      communityName: new FormControl(''),
      location: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]{3,30}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(passwordPattern)]),
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    }
    );
  }


  ngOnInit(): void {
  }

  setRadio(event: any) {
    let data = event.value;
    if (data == 'Community') {
      this.isHidden = true;
      this.signUpForm.get('communityName').setValidators([Validators.required, Validators.pattern(/[A-Za-z]{3,30}$/)]);
      this.signUpForm.get('communityName').updateValueAndValidity();
    }
    else {
      this.isHidden = false;
      this.signUpForm.get('communityName').clearValidators();
      this.signUpForm.get('communityName').updateValueAndValidity();
    }
  }

  createUserData() {
    let userType = Number(this.signUpForm.controls.userRole.value);
    let userData;
    if (userType == 1) {
      userData = new FarmerDetails();
      userData.user = new User();
      this.hashedPassword = String(Md5.hashStr(this.signUpForm.controls.password.value));
      userData.user.userFullName = this.signUpForm.controls.fullName.value;
      userData.user.phoneNumber = this.signUpForm.controls.mobileNumber.value;
      userData.user.email = this.signUpForm.controls.emailId.value;
      userData.user.location = this.signUpForm.controls.location.value;
      userData.user.password = this.hashedPassword;
      userData.user.userRole = userType;
      userData.farmerId = this.signUpForm.controls.farmerId.value;
      if (this.signUpForm.controls.signUpType.value == 'Community') {
        userData.community = new CommunityDetails();
        userData.community.communityName = this.signUpForm.controls.communityName.value;
      }
      return userData;
    }
    else {
      userData = new User();
      this.hashedPassword = String(Md5.hashStr(this.signUpForm.controls.password.value));
      userData.userFullName = this.signUpForm.controls.fullName.value;
      userData.phoneNumber = this.signUpForm.controls.mobileNumber.value;
      userData.email = this.signUpForm.controls.emailId.value;
      userData.location = this.signUpForm.controls.location.value;
      userData.password = this.hashedPassword;
      userData.userRole = userType;
      return userData;
    }
  }
  resetForm(){
    this.response='';
  }
  /**
   * method to submit the user form
   */
  onSubmit() {
    let userData = this.createUserData();
    let userType = Number(this.signUpForm.controls.userRole.value);
    if (userType == 1) {
      this.userservice.addFarmer(userData).subscribe(data => {
        this.response = data.responseMessage;
        if (this.response === 'Duplication') {
          this.isErrorOccured=true;
          this.displayError(this.isErrorOccured);
        }
        else if(this.response === 'Successfull'){
          this.isErrorOccured=false;
          this.displayConfirmation();
        }
      });
    }
    else {
      this.userservice.addUser(userData).subscribe(data => {
        this.isErrorOccured=false;
        this.displayConfirmation()},
        error => { this.isErrorOccured = true, 
          this.displayError(this.isErrorOccured) 
        });
    }
  }

  displayConfirmation() {
    if (!this.isErrorOccured) {
      Swal.fire({
        title: 'You are registered successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.routes.navigate(['/home']);
        }
      });
    }
  }
  
  displayError(messageError:boolean) {
    if (messageError) {
      Swal.fire({
        title: 'Oops',
        text: 'Email or Mobile Number already exists try to login!',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.routes.navigate(['/home']);
        }
      });
    }
  }

  getNameError() {
    if (this.signUpForm.controls.fullName.hasError('pattern')) {
      return "Name should be between 3-30 characters";
    }
    else {
      return "Name is required";
    }
  }

  getMobileError() {
    if (this.signUpForm.controls.mobileNumber.hasError('pattern')) {
      return "Mobile number should be 10 digits with valid number";
    }
    else {
      return "Mobile Number is required";
    }
  }

  getEmailError() {
    if (this.signUpForm.controls.emailId.hasError('pattern')) {
      return "Enter EmailId in proper format";
    }
    else {
      return "Email is required";
    }
  }

  getFarmerIdError() {
    return "Farmer Id is required";
  }

  getLocationError() {
    if (this.signUpForm.controls.location.hasError('pattern')) {
      return "Location should be atleast three characters";
    }
    else {
      return "Location is required";
    }
  }

  getCommunityNameError() {
    if (this.signUpForm.controls.communityName.hasError('pattern')) {
      return "Community Name should be atleast three characters";
    }
    else {
      return "Community Name is required";
    }
  }

  getPasswordError() {
    if (this.signUpForm.controls.password.hasError('pattern')) {
      return "Choose a password of at least eight characters, one uppercase letter,one special character and one number";
    }
    else {
      return "Password is required";
    }
  }

Back(){
  this._location.back();
}

  onChange(event: any) {
    let data = event.value;
    this.response = '';
    if (data == 1) {
      this.signUpForm.get('signUpType').setValidators([Validators.required]);
      this.signUpForm.get('signUpType').updateValueAndValidity();
      this.signUpForm.get('farmerId').setValidators([Validators.required]);
      this.signUpForm.get('farmerId').updateValueAndValidity();
    }
    else {
      this.signUpForm.get('signUpType').clearValidators();
      this.signUpForm.get('signUpType').updateValueAndValidity();
      this.signUpForm.get('farmerId').clearValidators();
      this.signUpForm.get('farmerId').updateValueAndValidity();
      this.signUpForm.get('communityName').clearValidators();
      this.signUpForm.get('communityName').updateValueAndValidity();
    }
  }
}
