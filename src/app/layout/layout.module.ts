import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { CodeChallengeCommonModule } from '../common/code-challenge-common.module';
import { LayoutComponent } from './component/layout.component';
import { TopbarComponent } from './component/topbar/topbar.component';


@NgModule({
  declarations: [LayoutComponent,TopbarComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CodeChallengeCommonModule
  ]
})
export class LayoutModule { }
