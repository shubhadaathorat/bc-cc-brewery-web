import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscardChangesGuard } from 'src/app/common/guard/discard-changes.guard';
import { UploadBreweryComponent } from './components/upload-brewery.component';

const routes: Routes = [
  { path: '', component: UploadBreweryComponent,canDeactivate: [DiscardChangesGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadBreweryRoutingModule { }
