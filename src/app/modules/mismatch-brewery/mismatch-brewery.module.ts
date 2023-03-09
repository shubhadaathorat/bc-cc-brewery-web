import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MismatchBreweryRoutingModule } from './mismatch-brewery-routing.module';
import { MismatchComponent } from './components/mismatch/mismatch.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CodeChallengeCommonModule } from 'src/app/common/code-challenge-common.module';
import { MatInputModule } from '@angular/material/input';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [MismatchComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MismatchBreweryRoutingModule,
    MaterialModule,
    CodeChallengeCommonModule,
    MatInputModule,
    MatTableExporterModule
  ]
})
export class MismatchBreweryModule { }
