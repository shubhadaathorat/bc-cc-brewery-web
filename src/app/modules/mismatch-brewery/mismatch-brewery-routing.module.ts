import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MismatchComponent } from './components/mismatch/mismatch.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':type',component: MismatchComponent, pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MismatchBreweryRoutingModule { }
