import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', loadChildren: () => import('../modules/onboarding/onboarding.module').then(m => m.OnboardingModule) },  
  { path: '', loadChildren: () => import('../layout/layout.module').then(m => m.LayoutModule) },
  { path: 'not-found', loadChildren: () => import('../page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  // This should be the last one in the array of routes.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false, scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
