import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { CodeChallengeCommonModule } from '../common/code-challenge-common.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    CodeChallengeCommonModule
  ]
})
export class PageNotFoundModule { }
