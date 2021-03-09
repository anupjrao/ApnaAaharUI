import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { User } from '../../../Models/User';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { Md5 } from 'ts-md5/dist/md5';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reser-password',
  templateUrl: './reser-password.component.html',
  styleUrls: ['./reser-password.component.css']
})
export class ReserPasswordComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder, private _location: Location, private _forgotPasswordService: ForgotPasswordService) { }
  user = new User()
  ngOnInit(): void {
    this.user = this._forgotPasswordService.user;
    sessionStorage.removeItem('Otp');
  }
  hashedPassword = ""
  hide = true;
  hide1 = true;
  get NewPassword() {
    return this.ResetPasswordForm.get('NewPassword');
  }
  get ConfirmPassword() {
    return this.ResetPasswordForm.get('ConfirmPassword');
  }
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ResetPasswordForm = this.fb.group({
    NewPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    ConfirmPassword: ['', [Validators.required]]
  },
    {
      validator: this.ConfirmedValidator('NewPassword', 'ConfirmPassword')
    }
  )

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  Back() {
    this._location.back();
  }

  Submit() {
    this.hashedPassword = String(Md5.hashStr(this.NewPassword.value));
    this.user.password = this.hashedPassword;
    this._forgotPasswordService.ResetPassword(this.user).subscribe(
      () => { 
        Swal.fire({
          title: 'Sucess',
          text: "Password Changes Sucessfully!",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/user/login'], { relativeTo: this.route })
          }
        })
       }
    );
  }
}
