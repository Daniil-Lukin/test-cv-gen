import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';

const routes: Routes = [
  {
    path:'',
    component: SelectionPageComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesRoutingModule { }
