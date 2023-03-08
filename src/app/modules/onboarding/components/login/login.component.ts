import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/mediation/auth.services';
import { LoginRequest } from 'src/app/common/models/login';
import { BreakpointObserver } from '@angular/cdk/layout';

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
export class LoginComponent implements OnInit,AfterViewInit {
  userNamePattern = /^[a-z0-9_-]{6,15}$/;
  loginForm = this.fb.group({
    username: [null, [Validators.required,Validators.pattern(this.userNamePattern)]],
    password: [null, Validators.required]
  }); 
  
  hidePwd = true;
  errorTitle: string;
  errorSubtitle: string;
  techErrorMsg: boolean;
  loginBreakpoint: any;
  gridListColumns = 2;
  isPhoneSize = false;


  constructor(private fb: FormBuilder,
              private authSvc: AuthService,
              private router: Router,private observer: BreakpointObserver ) { }

  ngOnInit(): void {  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.observer.observe(["(max-width: 900px)"]).subscribe((res) => {
       if (res.matches) {
         this.gridListColumns = 1;
         this.isPhoneSize = true;
         this.loginBreakpoint = '50vh';
       } else {
         this.gridListColumns = 2;
         this.isPhoneSize = false;
         this.loginBreakpoint = '100vh'
       }
     });
     }, 0);
  }

  public hasError = (formGroupName: FormGroup, controlName: string, errorName: string) => {
    return formGroupName.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let loginRequest = {} as LoginRequest ;
      loginRequest = this.loginForm.value;     
      this.authSvc.userLogin(loginRequest).subscribe((loginResponse) => {
        this.router.navigate(['/'], {queryParamsHandling: 'merge'});
      },
      err => {
        this.displayErrorMessage(err);
      });
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
}
