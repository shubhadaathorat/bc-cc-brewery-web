import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';

const onboardingRoutes: Routes = [
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(onboardingRoutes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
