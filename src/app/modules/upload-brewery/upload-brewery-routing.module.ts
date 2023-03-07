import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadBreweryComponent } from './components/upload-brewery.component';

const routes: Routes = [
  { path: '', component: UploadBreweryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadBreweryRoutingModule { }
