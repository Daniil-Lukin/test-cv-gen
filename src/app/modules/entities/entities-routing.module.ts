import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';
import { EntityComponent } from './components/entity/entity.component';

const routes: Routes = [
  {
    path: '',
    component: SelectionPageComponent,
  },
  {
    path: ':entity',
    component: EntityComponent,
    data: {title: 'headers.title.entities', description: 'headers.description.entities.entity'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntitiesRoutingModule {}
