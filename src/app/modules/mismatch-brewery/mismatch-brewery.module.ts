import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MismatchBreweryRoutingModule } from './mismatch-brewery-routing.module';
import { MismatchComponent } from './components/mismatch/mismatch.component';


@NgModule({
  declarations: [MismatchComponent],
  imports: [
    CommonModule,
    MismatchBreweryRoutingModule
  ]
})
export class MismatchBreweryModule { }
