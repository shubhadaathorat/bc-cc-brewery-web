import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guard/auth.guard';
import { LayoutComponent } from './component/layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home',canActivate: [AuthGuard], loadChildren: () => import('../modules/home/home.module').then(m => m.HomeModule) },
    { path: 'upload-brewery',canActivate: [AuthGuard], loadChildren: () => import('../modules/upload-brewery/upload-brewery.module').then(m => m.UploadBreweryModule)},
    { path: 'mismatch-brewery',canActivate: [AuthGuard], loadChildren: () => import('../modules/mismatch-brewery/mismatch-brewery.module').then(m => m.MismatchBreweryModule)},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
