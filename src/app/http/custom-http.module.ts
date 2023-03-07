import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RequestInterceptor} from './interceptor/request-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ]
})
export class CustomHttpModule { }
