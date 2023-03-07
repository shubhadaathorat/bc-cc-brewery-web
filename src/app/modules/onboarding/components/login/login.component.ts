import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'code-challenge-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('onClickTechErr', [
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
    trigger('onClickInfoMsg', [
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/;
  loginForm = this.fb.group({
    emailid: [null, [Validators.required,Validators.pattern(this.emailPattern)]],
    password: [null, Validators.required]
  }); 
  forgotForm = this.fb.group({
    regEmail: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
  });
  displayLogin = true;
  displayForgotCredentials = false;
  hidePwd = true;
  errorTitle: string;
  errorSubtitle: string;
  techErrorMsg: boolean;

  constructor(private fb: FormBuilder,
             // private authSvc: AuthService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  public hasError = (formGroupName: FormGroup, controlName: string, errorName: string) => {
    return formGroupName.controls[controlName].hasError(errorName);
  }

  displayForm(formName: string) {
    if (formName === 'forgot') {
      this.displayLogin = false;
      this.displayForgotCredentials = true;
    } else {
      this.displayLogin = true;
      this.displayForgotCredentials = false;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // let loginRequest = {} as LoginRequest ;
      // loginRequest = this.loginForm.value;
     
      // this.authSvc.userLogin(loginRequest).subscribe((loginResponse) => {
      //   this.router.navigate(['/'], {queryParamsHandling: 'merge'});
      // },
      // err => {
      //   this.displayErrorMessage(err);
      // });
    }
  }

  displayErrorMessage(err) {
    if (err && err.status === 400) {
      this.errorTitle = 'Invalid login credentials.';
      this.errorSubtitle = 'TRY AGAIN';
    } else {
      this.errorTitle = 'There was a technical error. Please check your credentials';
      this.errorSubtitle = 'TRY AGAIN';
    }
    this.techErrorMsg = true;
    setTimeout(() => {
      this.techErrorMsg = false;
    }, 2000);
  }

  onForgotSubmit() {
    if (this.forgotForm.valid) {
      console.log(this.forgotForm.value);
    }
  }
}
