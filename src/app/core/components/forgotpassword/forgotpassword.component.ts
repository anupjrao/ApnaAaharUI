import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators,ValidatorFn,FormGroup,ValidationErrors } from '@angular/forms';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import {Location} from '@angular/common';
import { from } from 'rxjs';
import { User } from '../../../Models/User';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private _location: Location,
    private fb: FormBuilder, private _forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
  }
  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  buttonName = "Send OTP";
  user = new User();
  errorM = "";
  otpdata = -1;
  AccountError="";
  otpError="";
  isOtpSet = false;
  inputError="";
  get Email() {
    return this.ForgotPasswordForm.get('Email');
  }
  get PhoneNo() {
    return this.ForgotPasswordForm.get('PhoneNo');
  }
  get Otp() {
    return this.OtpForm.get('Otp');
  }

  ForgotPasswordForm = this.fb.group({
    Email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    PhoneNo: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
  },
  )

  OtpForm = this.fb.group({
    Otp: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  })

  check() {
    if (this.Email.value === '' && this.PhoneNo.value === '') {
      this.inputError="At least one field should be filled";
      return false;
    }
    else {
      this.inputError="";
      return true;
    }
  }
  onSubmit() {

    this.user.email = this.Email.value;
    this.user.phoneNumber = this.PhoneNo.value;
    this._forgotPasswordService.user = this.user;
    this._forgotPasswordService.GetOtp(this.user).subscribe(
      res => { this.otpdata = res;this.CheckResponse(this.countdown); },
      () => { }
    )
  }

  CheckResponse(countdown1: CountdownComponent) {
    if (this.otpdata == 0) {
      this.AccountError="No such account found with this credential";
      this.isOtpSet = false;
    }
    else {
      this.AccountError=""
      this.getOtp(this.otpdata, countdown1)
    }
  }

  getOtp(data: number, countdown1: CountdownComponent) {
    sessionStorage.setItem("Otp", data.toString())
    this.OtpForm.controls.Otp.enable()
    if(countdown1!=null){
      countdown1.restart();
    }
    this.otpError=""
    if (this.errorM === "") {
    }
    else {
      this.errorM = "";
    }
    this.isOtpSet = true;
  }

  handleEvent(event: CountdownEvent) {
    if (event.left === 0) {
      this.OtpForm.controls.Otp.disable();
      this.errorM = "OTP Expired"
      this.buttonName = "Resend OTP"
      sessionStorage.removeItem('Otp');
    }
  }
  
  onSubmitotp() {
    if (sessionStorage.getItem("Otp") !== this.Otp.value) {
      this.otpError="OTP doesnot match"
    }
    else {
      this.otpError=""
      this.router.navigate(['/user/resetPassword']);
    }
  }

  Back(){
    this._location.back();
  }
}
