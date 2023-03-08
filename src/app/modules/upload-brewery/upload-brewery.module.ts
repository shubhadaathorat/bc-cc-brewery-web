import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadBreweryRoutingModule } from './upload-brewery-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CodeChallengeCommonModule } from 'src/app/common/code-challenge-common.module';
import { MatInputModule } from '@angular/material/input';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { UploadBreweryComponent } from './components/upload-brewery.component';
import { DiscardChangesGuard } from 'src/app/common/guard/discard-changes.guard';


@NgModule({
  declarations: [EditDialogComponent,UploadBreweryComponent],
  imports: [
    CommonModule,
    UploadBreweryRoutingModule,
    MaterialModule,
    CodeChallengeCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers:[DiscardChangesGuard]
})
export class UploadBreweryModule { }
