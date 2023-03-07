import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

// TODO: child routing using children component.
const homeRoutes: Routes = [
  {path: '', component: PageNotFoundComponent },  
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
