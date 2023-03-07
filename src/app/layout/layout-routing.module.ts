import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('../modules/Home/home.module').then(m => m.HomeModule) },
    { path: 'upload-brewery', loadChildren: () => import('../modules/upload-brewery/upload-brewery.module').then(m => m.UploadBreweryModule) },
    { path: 'mismatch-brewery', loadChildren: () => import('../modules/mismatch-brewery/mismatch-brewery.module').then(m => m.MismatchBreweryModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
