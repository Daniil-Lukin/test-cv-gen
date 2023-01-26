import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => 
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home-page.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
