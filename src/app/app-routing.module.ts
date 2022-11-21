import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/text/smth',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => 
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'home/text/smth',
    loadChildren: () =>
      import('./modules/cv-page/cv-page.module').then((m) => m.CvPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
