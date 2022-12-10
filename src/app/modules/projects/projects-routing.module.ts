import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsDisplayComponent } from './components/projects-display/projects-display.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsDisplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
