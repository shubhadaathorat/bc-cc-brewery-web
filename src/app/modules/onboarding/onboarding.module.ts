import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { CodeChallengeCommonModule } from '../../common/code-challenge-common.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoggedInGuard } from './guards/loggedIn.guard';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    OnboardingRoutingModule,
    CodeChallengeCommonModule
  ],
  providers:[LoggedInGuard]
})
export class OnboardingModule { }
