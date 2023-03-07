import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadBreweryRoutingModule } from './upload-brewery-routing.module';
import { UploadBreweryComponent } from './components/upload-brewery.component';


@NgModule({
  declarations: [UploadBreweryComponent],
  imports: [
    CommonModule,
    UploadBreweryRoutingModule
  ]
})
export class UploadBreweryModule { }
