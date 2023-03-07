import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { CodeChallengeCommonModule } from '../../common/code-challenge-common.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    CodeChallengeCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: []
})
export class HomeModule { }
