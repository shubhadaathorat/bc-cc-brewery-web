import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { WhiteSpaceTrimPipe } from './pipe/whitespace-trim.pipe';
import { FormatTimePipe } from './pipe/formatTime.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/service/spinner.service';
import { SubSpinnerComponent } from './spinner/sub-spinner/sub-spinner.component';
import { AddressTitleCasePipe } from './pipe/addressTitleCase.pipe';
import { FormatPhoneDirective } from './directives/formatPhone.directive';
import { RouterModule } from '@angular/router';
import { DigitOnlyDirective } from './directives/digitsOnly.directive';
import { CookiesService } from './services/cookies.service';
import { LocalStorageService } from './services/localStorage.service';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { CommonFiltersComponent } from './components/common-filters/common-filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [ WhiteSpaceTrimPipe, SpinnerComponent,
     FormatTimePipe, SubSpinnerComponent, AddressTitleCasePipe,
     FormatPhoneDirective,DigitOnlyDirective,
     ConfirmDialogComponent,CommonFiltersComponent,
     AlertComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MaterialModule,    
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule ,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    CommonModule,    
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    ConfirmDialogComponent,
    AddressTitleCasePipe,
    FormatPhoneDirective,
    DigitOnlyDirective,
    WhiteSpaceTrimPipe, SpinnerComponent,
     FormatTimePipe, SubSpinnerComponent,
     AlertComponent,CommonFiltersComponent
  ],
  providers: [SpinnerService, AddressTitleCasePipe,
    CookiesService, LocalStorageService,ConfirmDialogService,DatePipe ]
})
export class CodeChallengeCommonModule {}

