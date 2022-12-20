import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { ProjectsDisplayComponent } from './components/projects-display/projects-display.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsDisplayComponent,
  },
  {
    path: ':id',
    component: ProjectInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
